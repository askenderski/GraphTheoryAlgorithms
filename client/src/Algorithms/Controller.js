import {promisify} from "util";

export default function Controller({setResult, setIsDone, time = 1500, setNodeStyle}) {
    const handlers = {
        getWait: promisify(setTimeout)
    };

    async function consider(node, type) {
        const types = {
            current: {},
            passed: {},
            done: {},
            none: {}
        };

        setNodeStyle(node, types[type]);

        return handlers.getWait(time);
    }

    function invalidate() {
        handlers.getWait = () => Promise.reject();
    }

    return {consider, setIsDone, setResult, invalidate};
};