import Card from "../../../Card/Card";
import selectVariableTypeComponent from "./selectVariableTypeComponent";

export default function VariableCard({parser, variableType, variableName, variableValue, moving, setMoving, setStop}) {
    const movementOptions = {
        fixedPosition: moving,
        onMovementStart: ()=>setMoving(true),
        onMovementStop: ()=>setStop()
    };
    const resize = moving ? "both" : "vertical";

    const VariableTypeComponent = selectVariableTypeComponent(variableType);

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card resize={resize} cardStyle={{flexShrink: 0}} movement={movementOptions} headerContent={variableName}>
            <VariableTypeComponent variableValue={parser(variableValue)}/>
        </Card>
    );
}