import Card from "../../Card/Card";
import AlgorithmText from "./AlgorithmText";

const defaultPosition = {x: 200, y: 400};
const defaultSize = {width: "200px", height: "300px"};

export default function AlgorithmTextCard() {
    return (
        <Card headerContent={"Algorithm"} defaultPosition={defaultPosition} defaultSize={defaultSize}>
            <div style={{overflow: "hidden"}}><AlgorithmText/></div>
        </Card>
    );
}