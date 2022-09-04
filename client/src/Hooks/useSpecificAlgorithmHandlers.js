import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";
import { selectNodesRecord,
    mergeVariables as mergeVariablesAction, changeNodesRecord as changeNodesRecordAction } from "../Store/algorithm/algorithmSlice";
import { useSelector, useDispatch } from "react-redux";

export function useSpecificAlgorithmHandlers() {
    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);

    const setVariable = (name, value) => dispatch(mergeVariablesAction({[name]: value}));

    function getSetNodeStyleFunc({nodeId, style}) {
        return function setNodeStyleFunc(nodesRecord) {
            const nodeIndex = nodesRecord.get("nodes").findIndex(node=>node.id===nodeId);
            const newRecord = nodesRecord.setIn(["nodes", nodeIndex, "style"], style);

            return newRecord;
        };
    }

    const setNodeStyle = (nodeId, style) => dispatch(changeNodesRecordAction(getSetNodeStyleFunc({nodeId, style})));

    function getNodesIdList() {
        return nodesRecord.get("nodes").map(node => node.id);
    }

    function getEdgesRepresentation(edgesRepresentation) {
        return edgesRecordToGraphRepresentation(nodesRecord.get("edgesRecord"), edgesRepresentation);
    }

    return {
        getNodesIdList, getEdgesRepresentation, setVariable, setNodeStyle
    };
}