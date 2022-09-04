import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";
import { selectNodesRecord, setVariables as setVariablesAction } from "../Store/algorithm/algorithmSlice";
import { useSelector, useDispatch } from "react-redux";

export function useSpecificAlgorithmHandlers() {
    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);
    const setVariables = variables => dispatch(setVariablesAction(variables));

    function getNodesIdList() {
        return nodesRecord.get("nodes").map(node => node.id);
    }

    function getEdgesRepresentation(edgesRepresentation) {
        return edgesRecordToGraphRepresentation(nodesRecord.get("edgesRecord"), edgesRepresentation);
    }

    function setVariable(name, value) {
        setVariables({ [name]: value });
    }

    return {
        getNodesIdList, getEdgesRepresentation, setVariable
    };
}