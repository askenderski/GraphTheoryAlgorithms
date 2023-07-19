import { useRef, useEffect } from "react";

export default function useSizeObserver(action: ()=>void, defaultRef={offsetWidth:0, offsetHeight:0}) {
    const sizeRef = useRef<HTMLElement | {offsetWidth: number, offsetHeight: number}>(defaultRef);

    useEffect(() => {
        const observer = new ResizeObserver(action);
        observer.observe(sizeRef.current as unknown as HTMLElement);

        //the observer is disconnected upon unmounting
        return observer.disconnect.bind(observer);
    }, []);

    return sizeRef;
};