import VariablesContext from "../../../../Contexts/Controller/Variables";
import { useContext } from "react";

export default function IntegerVariable({variableName}) {
    console.log(variableName)
    const {variables} = useContext(VariablesContext);
    console.log(variables)
    const variableValue = variables[variableName];

    return (
        <span>{variableValue}</span>
    );
}