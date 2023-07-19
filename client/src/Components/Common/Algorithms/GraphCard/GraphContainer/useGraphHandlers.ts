import { useSelector } from "react-redux";
import { selectNodesRecord } from "../../../../../Store/algorithm/reducer";

export function useGraphHandlers() {
    const nodesRecord = useSelector(selectNodesRecord);

    function getNodes() {
        return nodesRecord.get("nodes");
    }

    return {
        getNodes, nodesRecord
    };
}
