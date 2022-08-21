import { v4 } from "uuid";

export default function Controller({setResult, setIsDone, time = 1500, setNodeStyle}) {
    let isDone = false;

    const originalWaitToConsider = async (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const handlers = {
        waitToConsider: originalWaitToConsider
    };

    async function consider(node, type) {
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

        return handlers.waitToConsider(time);
    }

    function invalidate() {
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
            };
        });
    }

    return {consider, _id: v4(), pause, unpause: () => doUnpause(), setIsDone: (...args)=>{isDone = true; setIsDone(...args)}, setResult, invalidate};
};