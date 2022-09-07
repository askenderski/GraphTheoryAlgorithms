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
    integer: " "
};

function getVariableConsiderator({ setVariable }) {
    async function considerVariable(variableType, name, considerationType, value) {
        if (considerationType === "remove") {
            setVariable(name, {type: variableType, value: defaultValueByType[variableType]});
            return;
        }

        setVariable(name, {type: variableType, value});
        return;
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

    async function consider(type, ...args) {
        switch (type) {
            case "graph":
                return considerGraph(...args);
            case "pointerLine":
                return considerPointerLine(...args);
            case "integer":
                return considerInteger(...args);
        }
    }

    return { consider, considerGraph, considerInteger, considerPointerLine };
}
