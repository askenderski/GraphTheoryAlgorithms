import Card from "../../../Card/Card";
import IntegerVariable from "./IntegerVariable";

export default function IntegerVariableCard({variableName, variableValue, moving, setMoving, setStop}) {
    const movementOptions = {
        fixedPosition: moving,
        onMovementStart: ()=>setMoving(true),
        onMovementStop: ()=>setStop()
    };
    const resize = "vertical";

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card resize={resize} movement={movementOptions} headerContent={variableName}>
            <IntegerVariable variableValue={variableValue}/>
        </Card>
    );
};