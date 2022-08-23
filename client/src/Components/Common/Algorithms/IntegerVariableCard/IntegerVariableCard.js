import Card from "../../../Common/Card/Card";
import IntegerVariable from "./IntegerVariable";

const defaultPosition = {x: 50, y: 150};
const defaultSize = {width: "50px", height: "50px"};

export default function IntegerVariableCard({variableName}) {
    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card headerContent={variableName} defaultPosition={defaultPosition} defaultSize={defaultSize}>
            <IntegerVariable variableName={variableName}/>
        </Card>
    );
};