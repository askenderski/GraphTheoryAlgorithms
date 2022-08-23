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
function getIntegerConsiderator({ setVariable }) {
    async function considerInteger(integer, considerationType, value) {
        if (considerationType === "remove") {
            setVariable(integer, "");
            return;
        }

        setVariable(integer, value);
        return;
    }

    return considerInteger;
}

export default function getConsiderator({ setters, waitTimes, waitToConsider }) {
    const considerGraph = getGraphConsiderator({
        setNodeStyle: setters.setNodeStyle, waitToConsider: waitToConsider.bind(undefined, waitTimes.graphTime)
    });
    const considerPointerLine = getPointerConsiderator({
        setPointerLine: setters.setPointerLine, waitToConsider: waitToConsider.bind(undefined, waitTimes.pointerTime)
    });
    const considerInteger = getIntegerConsiderator({ setVariable: setters.setVariable });

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
