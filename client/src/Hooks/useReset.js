import { useDispatch, useSelector } from "react-redux";
import {
    selectVariables,
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    resetNodesStyle as resetNodesStyleAction
} from "../Store/algorithm/algorithmSlice";

export function useReset() {
    const dispatch = useDispatch();

    const variables = useSelector(selectVariables);
    const setVariables = variables => dispatch(setVariablesAction(variables));

    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));

    const resetNodesStyle = () => dispatch(resetNodesStyleAction());

    function resetPointerLine() {
        setPointerLine(-1);
    }

    function resetVariables() {
        const newVariables = Object.keys(variables)
            .reduce((acc, varName) => ({ ...acc, [varName]: "" }), {});

        setVariables(newVariables);
    }

    const reset = () => {
        resetNodesStyle();
        resetPointerLine();
        resetVariables();
    };

    return reset;
}
