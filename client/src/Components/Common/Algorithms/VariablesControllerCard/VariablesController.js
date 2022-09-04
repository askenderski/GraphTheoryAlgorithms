import IntegerVariableCard from "./IntegerVariableCard/IntegerVariableCard";
import { useVariableHandlers } from "./useVariableHandlers";

export default function VariablesController() {
    const {variables} = useVariableHandlers();

    return <div>{
        Object.keys(variables).map(variableName=>
            <IntegerVariableCard variableValue={variables[variableName]} variableName={variableName} />)
        }</div>;
}