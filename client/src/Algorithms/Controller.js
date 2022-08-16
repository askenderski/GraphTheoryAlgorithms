export default function Controller({setResult, setIsDone, time = 3000, setNodeStyle}) {
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
        handlers.getWait = () => Promise.reject();
    }

    return {consider, setIsDone, setResult, invalidate};
};