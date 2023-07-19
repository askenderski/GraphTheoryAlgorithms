import { IGetConsiderator, IGetGraphConsiderator, IGetPointerConsiderator, IGetVariableConsiderator, INodeTypes, IVariableConsiderators } from "./IGetConsiderator";

const defaultNodeTypes: INodeTypes = {
    current: {
        color: "blue"
    },
    passed: {
        color: "green"
    },
    done: {
        color: "red"
    },
    current2: {
        color: "yellow"
    },
    current3: {
        color: "pink"
    }
};

const getGraphConsiderator: IGetGraphConsiderator = function ({ nodeTypes = defaultNodeTypes, setNodeStyle }) {
    async function considerGraph(node: string, type: string) {
        setNodeStyle(node, nodeTypes[type]);

        return;
    }

    return considerGraph;
}

const getPointerConsiderator: IGetPointerConsiderator = function ({ setPointerLine }) {
    return setPointerLine;
}

export const defaultValueByType = {
    integer: " ",
    array: [" "],
    objectArray: [[" ", " "]]
};

const variableConsiderators: IVariableConsiderators = {
    integer: {},
    array: {
        setAt: (
            {value: array, considerThisVariable}:
            {value: Array<any>, considerThisVariable: (type: string, value: Array<any>)=>void}
        ) => (_: any, index: number, val: any) => {
            return considerThisVariable("set", [...array.slice(0, index), val, ...array.slice(index+1)]);
        },
        unshift: (
            {value: array, considerThisVariable}:
            {value: Array<any>, considerThisVariable: (type: string, value: Array<any>)=>void}
        ) => (_: any, val: any) => {
            return considerThisVariable("set", [val, ...array.slice()]);
        }
    },
    objectArray: {
        setAt: (
            {value: objectArray, considerThisVariable}:
            {value: Array<[string, any]>, considerThisVariable: (type: string, value: Array<any>)=>void}
        ) => (_:any, key:string, value:any) => {
            const indexOfVal = objectArray.findIndex(([curKey])=>curKey===key);

            let resVal;

            if (indexOfVal === -1) {
                resVal = objectArray.slice();
                resVal.push([key, value]);
            } else {
                resVal = [...objectArray.slice(0,indexOfVal), [key, value], ...objectArray.slice(indexOfVal+1)];
            }

            return considerThisVariable("set", resVal);
        }
    }
};

const getVariableConsiderator: IGetVariableConsiderator = function ({ setVariable }) {
    const values: {[key:string]: any} = {};

    function considerVariable(
        variableType: ("integer" | "array" | "objectArray"),
        name: string, considerationType: string, ...rest: any
    ) {
        const getCustomConsiderator: ((
            (arg0: {value: any, considerThisVariable: (type: string, value: Array<any>)=>void})=>
                ((...args: any)=>any)
        ) | undefined) = variableConsiderators[variableType][considerationType];

        if (getCustomConsiderator !== undefined) {
            const customConsiderator = getCustomConsiderator({
                value: values[name],
                considerThisVariable: considerVariable.bind(undefined, variableType, name)
            });

            const res = customConsiderator({variableType, name, considerationType}, ...rest);
            values[name] = res;
            return res;
        }

        if (considerationType === "remove") {
            setVariable(name, {type: variableType, value: defaultValueByType[variableType]});
            delete values[name];
            return undefined;
        }

        const value = rest[0];

        if (considerationType === "add" || considerationType === "set") {
            setVariable(name, {type: variableType, value});
            values[name] = value;
            return value;
        }
    }

    return considerVariable;
}

const defaultWaitTimes = {graph: 500, pointerLine: 0, variable: 0};

const getConsiderator: IGetConsiderator = function ({setters, waitTimes = defaultWaitTimes, waitToConsider, addConsideration }) {
    const variableConsiderator = getVariableConsiderator({ setVariable: setters.setVariable });

    async function considerOriginal(type: ("variable" | "pointerLine" | "graph"), ...args: any[]) {
        switch (type) {
            case "graph":
                return getGraphConsiderator({
                    setNodeStyle: setters.setNodeStyle
                })(...args as [string, string]);
            case "pointerLine":
                return getPointerConsiderator({
                    setPointerLine: setters.setPointerLine
                })(...args as [number]);
            case "variable":
                return variableConsiderator(args[0] as ("integer" | "array" | "objectArray"),
                args[1] as string, args[2] as string, ...(args.slice(3)) as [any]);
        }
    }

    async function consider(type: ("variable" | "pointerLine" | "graph"), ...rest: any[]) {
        addConsideration([type, ...rest]);

        considerOriginal(type, ...rest);

        return waitToConsider(waitTimes[type]);
    }

    const considerGraph = consider.bind(undefined, "graph");
    const considerPointerLine = consider.bind(undefined, "pointerLine");
    const considerVariable = consider.bind(undefined, "variable");
    
    const considerInteger = considerVariable.bind(undefined, "integer");
    const considerArray = considerVariable.bind(undefined, "array");
    const considerObjectArray = considerVariable.bind(undefined, "objectArray");
    
    const considerators = {consider, considerOriginal, considerGraph, considerInteger, considerPointerLine, considerArray, considerObjectArray};

    return considerators;
}

export default getConsiderator;