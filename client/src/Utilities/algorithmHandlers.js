export function getGraphCardHandlers(nodesRecord, setNodesRecord) {
    function getNodes() {
        return nodesRecord.nodes;
    }

    return {
        getNodes
    };
};