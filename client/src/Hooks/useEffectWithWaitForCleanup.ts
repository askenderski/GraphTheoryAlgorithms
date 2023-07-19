import { useEffect, useRef } from "react";

const useEffectWithWaitForCleanup = function (func: Function, dependencies: any[]) {
    const cleanup = useRef<()=>void>(()=>{});

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

    useEffect(()=>cleanup.current, []);
};

export default useEffectWithWaitForCleanup;