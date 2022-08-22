import style from "./Line.module.css";
import Pointer from "./Pointer";

export default function Line({children, point}) {
    return <span className={style.line}><Pointer point={point}/>{children}</span>;
}