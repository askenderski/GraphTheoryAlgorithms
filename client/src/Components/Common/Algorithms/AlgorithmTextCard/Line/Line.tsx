import style from "./Line.module.css";
import Pointer from "./Pointer";
import React, {useEffect, useRef} from "react";
import useOnScreen from "../../../../../Hooks/useOnScreen";

export default function Line({children, point}: {children: string|JSX.Element|JSX.Element[], point: boolean}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isOnScreen = useOnScreen(ref);

    useEffect(()=>{
        if (!ref.current) return;

        if (point && !isOnScreen) ref.current.scrollIntoView();
    }, [point]);
    
    return <span ref={ref} className={style.line}><Pointer point={point}/>{children}</span>;
}