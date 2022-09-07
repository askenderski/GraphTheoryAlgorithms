import Card from "../../../Card/Card";
import selectVariableTypeComponent from "./selectVariableTypeComponent";

export default function VariableCard({variableType, variableName, variableValue, moving, setMoving, setStop}) {
    const movementOptions = {
        fixedPosition: moving,
        onMovementStart: ()=>setMoving(true),
        onMovementStop: ()=>setStop()
    };
    const resize = "vertical";

    const VariableTypeComponent = selectVariableTypeComponent(variableType);

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card resize={resize} movement={movementOptions} headerContent={variableName}>
            <VariableTypeComponent variableValue={variableValue}/>
        </Card>
    );
}