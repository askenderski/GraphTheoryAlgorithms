import GraphContainer from "./GraphContainer/GraphContainer";
import style from "./GraphCard.module.css";

export default function GraphCard(props) {
    return (
        <div className={style.card}>
            <GraphContainer/>
        </div>
    );
}