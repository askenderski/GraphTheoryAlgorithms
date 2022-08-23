import VariablesContext from "../../../../Contexts/Controller/Variables";
import { useContext } from "react";

export default function IntegerVariable({variableName}) {
    console.log(variableName)
    const {variableValues} = useContext(VariablesContext);
    console.log(variableValues)
    const variableValue = variableValues[variableName];

    return (
        <span>{variableValue}</span>
    );
}