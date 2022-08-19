export default function Controller({setResult, setIsDone, time = 3000, setNodeStyle}) {
    let isDone = false;

    const handlers = {
        waitToConsider: async (time) => new Promise((resolve) => setTimeout(() => resolve(), time))
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
                resolve();
            });
        });
    }

    return {consider, setIsDone: (...args)=>{isDone = true; setIsDone(...args)}, setResult, invalidate};
};