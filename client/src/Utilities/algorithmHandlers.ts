import { INodesRecord } from "Records/NodesRecord/NodesRecord";

export function getGraphCardHandlers(nodesRecord: INodesRecord, setNodesRecord: any) {
    function getNodes() {
        return nodesRecord.get("nodes");
    }

    return {
        getNodes
    };
};