import IntegerVariable from "./IntegerVariable";

export default function selectVariableTypeComponent(variableType) {
    switch (variableType) {
        case "integer":
            return IntegerVariable;
    }

    return function ({variableValue}) { return <span>{JSON.stringify({value: variableValue})}</span>;};
}