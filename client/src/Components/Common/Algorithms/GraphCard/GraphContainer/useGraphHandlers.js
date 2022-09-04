import { useSelector } from "react-redux";
import { selectNodesRecord } from "../../../../../Store/algorithm/algorithmSlice";

export function useGraphHandlers() {
    const nodesRecord = useSelector(selectNodesRecord);

    function getNodes() {
        return nodesRecord.nodes;
    }

    return {
        getNodes, nodesRecord
    };
}
