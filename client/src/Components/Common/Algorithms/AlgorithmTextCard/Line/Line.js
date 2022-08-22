import style from "./Line.module.css";

export default function Line({children}) {
    return <span className={style.line}>{children}</span>;
}