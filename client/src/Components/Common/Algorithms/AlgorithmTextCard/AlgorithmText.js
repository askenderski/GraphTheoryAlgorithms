import style from "./AlgorithmText.module.css";
import { useContext } from "react";
import AlgorithmTextContext from "../../../../Contexts/Controller/AlgorithmText";
import Line from "./Line/Line";

export default function AlgorithmText() {
    const {algorithmText, pointLine} = useContext(AlgorithmTextContext);

    const lines = algorithmText.split("\n")
        .map((line, i)=><Line point={i+1 === pointLine ? true : false}>{line}</Line>);

    return (
        <div className={style.algorithmText}>{lines}</div>
    );
}