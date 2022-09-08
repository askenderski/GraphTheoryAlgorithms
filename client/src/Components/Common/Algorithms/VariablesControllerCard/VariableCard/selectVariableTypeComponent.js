import ArrayVariable from "./ArrayVariable";
import IntegerVariable from "./IntegerVariable";

export default function selectVariableTypeComponent(variableType) {
    switch (variableType) {
        case "integer":
            return IntegerVariable;
        case "array":
            return ArrayVariable;
    }

    return function ({variableValue}) { return <span>{JSON.stringify({value: variableValue})}</span>;};
}