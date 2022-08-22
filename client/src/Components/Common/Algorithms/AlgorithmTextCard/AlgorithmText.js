import style from "./AlgorithmText.module.css";
import { useContext } from "react";
import AlgorithmTextContext from "../../../../Contexts/Controller/AlgorithmText";
import Line from "./Line/Line";

export default function AlgorithmText() {
    const {algorithmText} = useContext(AlgorithmTextContext);

    return <div className={style.algorithmText}>{algorithmText.split("\n").map(line=><Line>{line}</Line>)}</div>;
}