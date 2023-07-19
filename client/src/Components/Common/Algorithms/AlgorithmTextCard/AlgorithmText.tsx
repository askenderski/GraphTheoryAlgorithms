import style from "./AlgorithmText.module.css";
import Line from "./Line/Line";
import useAlgorithmTextHandlers from "../../../../Hooks/useAlgorithmTextHandlers";

export default function AlgorithmText() {
    const {algorithmText, pointerLine}: {algorithmText: string, pointerLine: number} = useAlgorithmTextHandlers();

    const lines = algorithmText.split("\n")
        .map((line, i)=><Line point={i+1 === pointerLine ? true : false}>{line}</Line>);

    return (
        <div className={style.algorithmText}>{lines}</div>
    );
}