import {promisify} from "util";

export default function Controller({setResult, setIsDone, time = 1500, setNodeStyle}) {
    const handlers = {
        waitToConsider: async (time) => new Promise((resolve) => setTimeout(() => resolve(), time))
    };

    async function consider(node, type) {
        const types = {
            current: {},
            passed: {},
            done: {},
            none: {}
        };

        setNodeStyle(node, types[type]);

        console.log(handlers.waitToConsider)
        return handlers.waitToConsider(time);
    }

    function invalidate() {
        handlers.getWait = () => Promise.reject();
    }

    return {consider, setIsDone, setResult, invalidate};
};