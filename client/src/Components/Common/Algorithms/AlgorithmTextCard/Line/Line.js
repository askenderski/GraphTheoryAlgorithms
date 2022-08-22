import style from "./Line.module.css";
import Pointer from "./Pointer";
import {useEffect, useRef} from "react";
import useOnScreen from "../../../../../Hooks/useOnScreen";

export default function Line({children, point}) {
    const ref = useRef();
    const isOnScreen = useOnScreen(ref);

    useEffect(()=>{
        if (point && !isOnScreen) ref.current.scrollIntoView();
    }, [point]);
    
    return <span ref={ref} className={style.line}><Pointer point={point}/>{children}</span>;
}