import VariablesContext from "../../../../Contexts/Controller/Variables";
import { useContext } from "react";
import IntegerVariableCard from "./IntegerVariableCard/IntegerVariableCard";

export default function VariablesController() {
    const {variables} = useContext(VariablesContext);

    return <div>{
        Object.keys(variables).map(variableName=>
            <IntegerVariableCard variableValue={variables[variableName]} variableName={variableName} />)
        }</div>;
}