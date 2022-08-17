import Card from "../../../Common/Card/Card";

const defaultSize = {width: "50px", height: "50px"};
const defaultPosition = {x: 50, y: 50};

export default function StartAlgorithmButton({startAlgorithm}) {
    return (
        <Card defaultPosition={defaultPosition} defaultSize={defaultSize} headerContent={""}>
            <button onClick={startAlgorithm}>Start</button>
        </Card>
    );
}