import { useDispatch, useSelector } from "react-redux";
import {
    selectVariables,
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    changeNodesRecord as changeNodesRecordAction
} from "../Store/algorithm/algorithmSlice";
import { defaultNodeStyle } from "../Data/Algorithms/graph";
import { defaultValueByType } from "../Algorithms/GenericController/getConsiderator";

export function useReset() {
    const dispatch = useDispatch();

    const variables = useSelector(selectVariables);
    const setVariables = variables => dispatch(setVariablesAction(variables));

    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));

    function resetNodesStyleFunc(nodesRecord) {
        const newNodes = nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
        const newNodesRecord = nodesRecord.set("nodes", newNodes);
        return newNodesRecord;
    }

    const resetNodesStyle = () => dispatch(changeNodesRecordAction(resetNodesStyleFunc));

    function resetPointerLine() {
        setPointerLine(-1);
    }

    function resetVariables() {
        const newVariables = Object.entries(variables)
            .reduce((acc, [varName, {type}]) => ({ ...acc, [varName]: {type, value: defaultValueByType[type] }}), {});

        console.log(newVariables)

        setVariables(newVariables);
    }

    const reset = () => {
        resetNodesStyle();
        resetPointerLine();
        resetVariables();
    };

    return reset;
}
