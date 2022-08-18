import Card from "../../../Common/Card/Card";
import StartAlgorithmButton from "./StartAlgorithmButton";

const defaultSize = {width: "50px", height: "50px"};
const defaultPosition = {x: 50, y: 50};

export default function StartAlgorithmCard({algorithmTitle, algorithmType}) {
    return (
        <Card defaultPosition={defaultPosition} defaultSize={defaultSize} headerContent={""}>
            <StartAlgorithmButton algorithmType={algorithmType}
            algorithmTitle={algorithmTitle}/>
        </Card>
    );
}