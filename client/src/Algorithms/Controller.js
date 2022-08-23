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

function getGraphConsiderator({nodeTypes=defaultNodeTypes, graphTime, setNodeStyle, handlers}) {
    async function considerGraph(node, type) {
        setNodeStyle(node, nodeTypes[type]);

        return handlers.waitToConsider(graphTime);
    }

    return considerGraph;
}

function getPointerConsiderator({setPointerLine, pointerTime, handlers}) {
    async function considerPointerLine(pointerLine) {
        setPointerLine(pointerLine);
        return handlers.waitToConsider(pointerTime);
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

function getConsiderator({setters, graphTime, pointerTime, handlers}) {
    const considerGraph = getGraphConsiderator({setNodeStyle: setters.setNodeStyle, graphTime, handlers});
    const considerPointerLine = getPointerConsiderator({setPointerLine: setters.setPointerLine, pointerTime, handlers});
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

export default function Controller(
    {setIsDone, graphTime = 4000, pointerTime = 700, setters}
    ) {
    let isDone = false;

    const originalWaitToConsider = async (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const handlers = {
        waitToConsider: originalWaitToConsider
    };

    const {consider} = getConsiderator({handlers, setters, pointerTime, graphTime});

    async function invalidate() {
        if (doUnpause) {
            isDone = true;
            return;
        }

        return new Promise(resolve=>{
            if (isDone) return resolve();
            
            handlers.waitToConsider = () => Promise.reject().finally(()=>{
                isDone = true;
                resolve();
            });
        });
    }
    
    let doUnpause;

    function pause() {
        handlers.waitToConsider = () => new Promise((resolve) => {
            doUnpause = () => {
                resolve();
                handlers.waitToConsider = originalWaitToConsider;
                doUnpause = undefined;
            };
        });
    }

    return {consider, _id: v4(), pause, unpause: () => doUnpause(), setIsDone: (...args)=>{isDone = true; setIsDone(...args)}, invalidate};
};