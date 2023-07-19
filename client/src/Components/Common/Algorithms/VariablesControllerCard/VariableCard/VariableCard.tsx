import Card from "../../../Card/Card";
import selectVariableTypeComponent from "./selectVariableTypeComponent";

interface IVariableCardProps extends React.PropsWithChildren {
    parser: (prop: any)=>any,
    variableType: string,
    variableName: string,
    variableValue: any,
    moving: boolean,
    setMoving: (arg: boolean)=>void,
    setStop: ()=>void
}

export default function VariableCard(
    {parser, variableType, variableName, variableValue, moving, setMoving, setStop}: IVariableCardProps
) {
    const movementOptions = {
        fixedPosition: moving,
        onMovementStart: ()=>setMoving(true),
        onMovementStop: ()=>setStop()
    };
    const resize = moving ? "both" : "vertical";

    const VariableTypeComponent = selectVariableTypeComponent(variableType);

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card resize={resize} cardStyle={{flexShrink:0}} movement={movementOptions} headerContent={variableName}>
            <VariableTypeComponent variableValue={parser(variableValue)}/>
        </Card>
    );
}