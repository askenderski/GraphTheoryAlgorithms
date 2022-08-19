import { defaultNodeStyle } from "../Data/Algorithms/graph";

export function getNodesHandlers(setNodes) {
    function addNode() {
        setNodes(nodes => nodes.addNode());
    }

    function deleteNodeByIndex(i) {
        setNodes(nodes => nodes.deleteNodeByIndex(i));
    }

    function setEdgeByIndex({to, from}, val) {
        setNodes(nodes => nodes.setEdgeByIndex({to, from}, val));
    }

    function toggleIsDirected() {
        setNodes(nodes => nodes.toggleIsDirected());
    }

    function toggleIsWeighted() {
        setNodes(nodes => nodes.toggleIsWeighted());
    }

    return {addNode, setEdgeByIndex, toggleIsDirected, toggleIsWeighted, deleteNodeByIndex};
};

export function getStartAlgorithmHandlers(setNodes) {
    function resetNodes() {
        setNodes(nodesRecord => {
            const newNodes = nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
            return nodesRecord.set("nodes", newNodes);
        });
    }

    function setNodesRecord(newRecord) {
        setNodes(newRecord);
    }

    return {setNodesRecord, resetNodes};
};