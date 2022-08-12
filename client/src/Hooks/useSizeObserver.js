import { useRef, useEffect } from "react";

export default function useSizeObserver(defaultRef={style: {width: "0px", height: "0px"}}, action) {
    const sizeRef = useRef(defaultRef);

    useEffect(() => {
        const observer = new ResizeObserver(action);
        observer.observe(sizeRef.current);

        //the observer is disconnected upon unmounting
        return observer.disconnect.bind(observer);
    }, []);

    return sizeRef;
};