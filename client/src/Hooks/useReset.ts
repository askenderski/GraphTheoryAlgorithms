import { useDispatch, useSelector } from "react-redux";
import { selectVariables } from "../Store/algorithm/reducer";
import { defaultNodeStyle } from "../Data/Algorithms/graph";
import { defaultValueByType } from "../Algorithms/GenericController/getConsiderator";
import { algorithmActions } from "Store/store";
import { INodesRecord } from "Records/NodesRecord/NodesRecord";

const { setPointerLine: setPointerLineAction, setVariables: setVariablesAction,
    changeNodesRecord: changeNodesRecordAction, setConsiderations: setConsiderationsAction
} = algorithmActions;

let i = 0

export function useReset() {
    const i1 = i++

    const dispatch = useDispatch();

    const variables = useSelector(selectVariables);
    const setVariables = (variables: any) => dispatch(setVariablesAction(variables));

    const setPointerLine = (pointerLine: number) => dispatch(setPointerLineAction(pointerLine));

    const setConsiderations = (considerations: any) => dispatch(setConsiderationsAction(considerations));

    function resetNodesStyleFunc(nodesRecord: INodesRecord) {
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
            .reduce((acc, [varName, {type}]: [string, {type: keyof typeof defaultValueByType}]) => {
                const defaultValue = defaultValueByType[type];

                return {
                    ...acc,
                    [varName]: {type, value: defaultValue}
                };
            }, {});

        setVariables(newVariables);
    }

    function resetConsiderations() {
        setConsiderations([]);
    }

    const reset = () => {
        resetNodesStyle();
        resetPointerLine();
        resetVariables();
        resetConsiderations();
    };

    return reset;
}