import { v4 } from "uuid";

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

function getGraphConsiderator({nodeTypes=defaultNodeTypes, setNodeStyle, waitToConsider}) {
    async function considerGraph(node, type) {
        setNodeStyle(node, nodeTypes[type]);

        return waitToConsider();
    }

    return considerGraph;
}

function getPointerConsiderator({setPointerLine, pointerTime, waitToConsider}) {
    async function considerPointerLine(pointerLine) {
        setPointerLine(pointerLine);
        return waitToConsider(pointerTime);
    }

    return considerPointerLine;
}

function getIntegerConsiderator({setVariable}) {
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

function getConsiderator({setters, graphTime, pointerTime, waitToConsider}) {
    const considerGraph = getGraphConsiderator({
        setNodeStyle: setters.setNodeStyle, waitToConsider: waitToConsider.bind(undefined, graphTime)
    });
    const considerPointerLine = getPointerConsiderator({
        setPointerLine: setters.setPointerLine, waitToConsider: waitToConsider.bind(undefined, pointerTime)
    });
    const considerInteger = getIntegerConsiderator({setVariable: setters.setVariable});

    async function consider(type, ...args) {
        switch (type) {
            case "graph":
                return considerGraph(...args);
            case "pointerLine":
                return considerPointerLine(...args);
            case "integer":
                return considerInteger(...args)
        }
    }

    return {consider, considerGraph, considerInteger, considerPointerLine}
}

function getAlgorithmRunningFunctionality({setIsDoneOutsideController}) {
    let isDone = false;
    let isPaused = false;

    const waitToConsider = async (time) => {
        return new Promise((resolve, reject) => {
            doAlgorithmUnpause = resolve;
            doStopAlgorithm = reject;

            setTimeout(() => {
                if (isPaused) return;

                resolve();
            }, time);
        });
    };

    function invalidate() {
        if (!isPaused && !isDone) {
            doStopAlgorithm();
        }

        isDone = true;
        setIsDone(true);

        return;
    }

    let doAlgorithmUnpause;
    let doStopAlgorithm;
    
    function unpause() {
        if (!isPaused) return;

        doAlgorithmUnpause();
        isPaused = false;
    }

    function pause() {
        isPaused = true;
    }

    function setIsDone(...args) {
        isDone = true;
        return setIsDoneOutsideController(...args);
    }

    return {setIsDone, outsideControls: {pause, unpause, invalidate}, waitToConsider};
}

export default function getController(
    {setIsDone: setIsDoneOutsideController, graphTime = 4000, pointerTime = 700, setters, algorithm}
    ) {
    const {outsideControls, waitToConsider, setIsDone} =
        getAlgorithmRunningFunctionality({setIsDoneOutsideController});
    const considers = getConsiderator({waitToConsider, setters, pointerTime, graphTime});

    const run = algorithm.getRun({setIsDone, considers});
    
    return {...outsideControls, run};
};