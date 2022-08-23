import Card from "../../Card/Card";
import AlgorithmControllerContainer from "./AlgorithmControllerContainer";

const defaultSize = {width: "50px", height: "50px"};
const defaultPosition = {x: 50, y: 50};

export default function StartAlgorithmCard() {
    return (
        <Card defaultPosition={defaultPosition} defaultSize={defaultSize} headerContent={""}>
            <AlgorithmControllerContainer/>
        </Card>
    );
}