import { useEffect, useRef } from "react";

const useEffectWithWaitForCleanup = function (func, dependencies) {
    const cleanup = useRef();

    useEffect(()=>{
        async function main() {
            if (cleanup.current !== undefined) {
                await cleanup.current();
            }

            const res = func();
            cleanup.current = res;
        }

        main();
    }, dependencies);

    useEffect(()=>{
        return cleanup.current;
    }, []);
};

export default useEffectWithWaitForCleanup;