import { v4 } from "uuid";

export default function Controller(
    {setResult, setIsDone, graphTime = 4000, pointerTime = 700, setNodeStyle, setPointerLine, setVariable}
    ) {
    let isDone = false;
    console.log(setVariable)

    const originalWaitToConsider = async (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const handlers = {
        waitToConsider: originalWaitToConsider
    };

    async function considerGraph(node, type) {
        const types = {
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

        setNodeStyle(node, types[type]);

        return handlers.waitToConsider(graphTime);
    }

    async function considerPointerLine(pointerLine) {
        setPointerLine(pointerLine);
        return handlers.waitToConsider(pointerTime);
    }

    async function considerInteger(integer, considerationType, value) {
        if (considerationType === "remove") {
            setVariable(integer, "");
            return;
        }

        setVariable(integer, value);
        return;
    }

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

    return {consider, _id: v4(), pause, unpause: () => doUnpause(), setIsDone: (...args)=>{isDone = true; setIsDone(...args)}, setResult, invalidate};
};