import { defaultNodeStyle } from "../Data/Algorithms/graph";

export function getHandlers(nodes, setNodes) {
    function addNode() {
        setNodes(nodes => nodes.addNode());
    }

    function resetNodes() {
        setNodes(nodesRecord => {
            const newNodes = nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
            return nodesRecord.set("nodes", newNodes);
        });
    }

    function setEdgeByIndex({to, from}, val) {
        setNodes(nodes => nodes.setEdgeByIndex({to, from}, val));
    }

    function deleteNodeByIndex(i) {
        setNodes(nodes => nodes.deleteNodeByIndex(i));
    }

    function toggleIsDirected() {
        setNodes(nodes => nodes.toggleIsDirected());
    }

    function toggleIsWeighted() {
        setNodes(nodes => nodes.toggleIsWeighted());
    }

    function setNodesRecord(newRecord) {
        setNodes(newRecord);
    }

    return {addNode, setNodesRecord, resetNodes, setEdgeByIndex, deleteNodeByIndex, toggleIsDirected, toggleIsWeighted};
};