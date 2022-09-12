const defaultNodeTypes = {
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
function getGraphConsiderator({ nodeTypes = defaultNodeTypes, setNodeStyle, waitToConsider }) {
    async function considerGraph(node, type) {
        setNodeStyle(node, nodeTypes[type]);

        return waitToConsider();
    }

    return considerGraph;
}
function getPointerConsiderator({ setPointerLine, pointerTime, waitToConsider }) {
    async function considerPointerLine(pointerLine) {
        setPointerLine(pointerLine);
        return waitToConsider(pointerTime);
    }

    return considerPointerLine;
}

export const defaultValueByType = {
    integer: " ",
    array: [" "],
    objectArray: [[" ", " "]]
};

const variableConsiderators = {
    integer: {},
    array: {
        setAt: ({value: array, considerThisVariable}) => (_, index, val) => {
            return considerThisVariable("set", [...array.slice(0, index), val, ...array.slice(index+1)]);
        },
        unshift: ({value: array, considerThisVariable}) => (_, val) => {
            return considerThisVariable("set", [val, ...array.slice()]);
        }
    },
    objectArray: {
        setAt: ({value: objectArray, considerThisVariable}) => (_, key, value) => {
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

function getVariableConsiderator({ setVariable }) {
    const values = {};

    function considerVariable(variableType, name, considerationType, ...rest) {
        const getCustomConsiderator = variableConsiderators[variableType][considerationType];

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

const defaultWaitTimes = {graphTime: 4000, pointerTime: 700};

export default function getConsiderator({setters, waitTimes = defaultWaitTimes, waitToConsider, addConsideration }) {
    const variableConsiderator = getVariableConsiderator({ setVariable: setters.setVariable });

    async function considerOriginal(type, ...args) {
        switch (type) {
            case "graph":
                return getGraphConsiderator({
                    setNodeStyle: setters.setNodeStyle, waitToConsider: waitToConsider.bind(undefined, waitTimes.graphTime)
                })(...args);
            case "pointerLine":
                return getPointerConsiderator({
                    setPointerLine: setters.setPointerLine, waitToConsider: waitToConsider.bind(undefined, waitTimes.pointerTime)
                })(...args);
            case "variable":
                return variableConsiderator(...args);
        }
    }

    async function consider(...rest) {
        addConsideration(rest);

        return considerOriginal(...rest);
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