import { useSelector } from "react-redux";
import { selectVariables } from "../../../../Store/algorithm/reducer";

export function useVariableHandlers() {
    const variables = useSelector(selectVariables);

    return { variables };
}