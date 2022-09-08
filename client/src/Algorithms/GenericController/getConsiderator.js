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
    array: [" "]
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
    }
};

function getVariableConsiderator({ setVariable }) {
    const values = {};

    function considerVariable(variableType, name, considerationType, ...rest) {
        const getCustomConsiderator = variableConsiderators[variableType][considerationType];

        if (getCustomConsiderator !== undefined) {
            console.log(values, name)
            const customConsiderator = getCustomConsiderator({
                value: values[name],
                considerThisVariable: considerVariable.bind(undefined, variableType, name)
            })

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

export default function getConsiderator({setters, waitTimes = defaultWaitTimes, waitToConsider }) {
    const considerGraph = getGraphConsiderator({
        setNodeStyle: setters.setNodeStyle, waitToConsider: waitToConsider.bind(undefined, waitTimes.graphTime)
    });
    const considerPointerLine = getPointerConsiderator({
        setPointerLine: setters.setPointerLine, waitToConsider: waitToConsider.bind(undefined, waitTimes.pointerTime)
    });
    const considerVariable = getVariableConsiderator({ setVariable: setters.setVariable });
    const considerInteger = considerVariable.bind(undefined, "integer");
    const considerArray = considerVariable.bind(undefined, "array");

    async function consider(type, ...args) {
        switch (type) {
            case "graph":
                return considerGraph(...args);
            case "pointerLine":
                return considerPointerLine(...args);
            case "variable":
                return considerVariable(...args);
        }
    }

    return { consider, considerGraph, considerInteger, considerPointerLine, considerArray };
}