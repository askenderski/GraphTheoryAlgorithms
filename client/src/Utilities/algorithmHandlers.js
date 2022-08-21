import { defaultNodeStyle } from "../Data/Algorithms/graph";
import { adjacencyMatrixToGraphRepresentation } from "./graphs";

export function getNodesHandlers(nodesRecord, setNodes, {invalidateAlgorithm}) {
    function addNode() {
        setNodes(nodes => nodes.addNode());
    }

    function deleteNode(nodeId) {
        setNodes(nodes => nodes.deleteNodeById(nodeId));
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

    const nodeRecordHandlers = {addNode, setEdgeByIndex, toggleIsDirected, toggleIsWeighted, deleteNode};

    function getNodesList() {
        return nodesRecord.get("nodes");
    }

    function getNodeCount() {
        return nodesRecord.get("nodeCount");
    }

    function getEdgeByIndex({to, from}) {
        return nodesRecord.getEdgeByIndex({to, from});
    }

    function getIsWeighted() {
        return nodesRecord.get("isWeighted");
    }

    function getIsDirected() {
        return nodesRecord.get("isDirected");
    }

    function getEdgeValue(edge) {
        return edge.get("value");
    }

    Object.keys(nodeRecordHandlers).forEach(key=>{
        const originalFunc = nodeRecordHandlers[key];

        nodeRecordHandlers[key] = async function (...args) {
            await invalidateAlgorithm();
            return originalFunc.apply(nodeRecordHandlers, args);
        };
    })

    nodeRecordHandlers.getNodesList = getNodesList;
    nodeRecordHandlers.getNodeCount = getNodeCount;
    nodeRecordHandlers.getEdgeByIndex = getEdgeByIndex;
    nodeRecordHandlers.getIsWeighted = getIsWeighted;
    nodeRecordHandlers.getIsDirected = getIsDirected;
    nodeRecordHandlers.getEdgeValue = getEdgeValue;

    return nodeRecordHandlers;
};

export function getStartAlgorithmHandlers(nodesRecord, setNodes) {
    function resetNodes() {
        setNodes(nodesRecord => {
            const newNodes = nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
            return nodesRecord.set("nodes", newNodes);
        });
    }

    function setNodesRecord(newRecord) {
        setNodes(newRecord);
    }

    function setNodeStyleByIndex(nodeIndex, style) {
        setNodesRecord(oldNodesRecord => {
            const newNodesRecord=oldNodesRecord.setNodeByIndex(nodeIndex, {style});

            const oldNodes = oldNodesRecord.get("nodes");
            const newNodes = oldNodes.set(nodeIndex, newNodesRecord.get("nodes").get(nodeIndex));
            return oldNodesRecord.set("nodes", newNodes);
        });
    }

    function getNodesList() {
        return nodesRecord.get("nodes");
    }

    function getEdgesRepresentation(edgesRepresentation) {
        return adjacencyMatrixToGraphRepresentation(nodesRecord.adjacencyMatrix, edgesRepresentation);
    }

    return {setNodesRecord, resetNodes, setNodeStyleByIndex, getNodesList, getEdgesRepresentation};
};