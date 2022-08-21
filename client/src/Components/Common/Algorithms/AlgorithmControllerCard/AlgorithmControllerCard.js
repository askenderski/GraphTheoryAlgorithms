import Card from "../../Card/Card";
import StartAlgorithmButton from "./AlgorithmController";

const defaultSize = {width: "50px", height: "50px"};
const defaultPosition = {x: 50, y: 50};

export default function StartAlgorithmCard() {
    return (
        <Card defaultPosition={defaultPosition} defaultSize={defaultSize} headerContent={""}>
            <StartAlgorithmButton/>
        </Card>
    );
}