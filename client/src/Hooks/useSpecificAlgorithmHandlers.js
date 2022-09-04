import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";
import { selectNodesRecord,
    setVariable as setVariableAction, setNodeStyle as setNodeStyleAction } from "../Store/algorithm/algorithmSlice";
import { useSelector, useDispatch } from "react-redux";

export function useSpecificAlgorithmHandlers() {
    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);

    const setVariable = (name, value) => dispatch(setVariableAction({name, value}));

    const setNodeStyle = (nodeId, style) => dispatch(setNodeStyleAction({nodeId, style}));

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