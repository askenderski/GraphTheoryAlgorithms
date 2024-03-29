import ArrayVariable from "./ArrayVariable";
import IntegerVariable from "./IntegerVariable";
import ObjectArrayVariable from "./ObjectArrayVariable";

export default function selectVariableTypeComponent(variableType: string) {
    switch (variableType) {
        case "integer":
            return IntegerVariable;
        case "array":
            return ArrayVariable;
        case "objectArray":
            return ObjectArrayVariable;
    }

    return function ({variableValue}: {variableValue: any}) {
        return <span>{JSON.stringify({value: variableValue})}</span>;
    };
}