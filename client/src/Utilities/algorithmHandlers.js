import { defaultNodeStyle } from "../Data/Algorithms/graph";
import { edgesRecordToGraphRepresentation } from "./graphs";

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

    function setEdge({to, from}, value) {
        setNodes(nodes => nodes.setEdge({to, from, value}));
    }

    function toggleIsDirected() {
        setNodes(nodes => nodes.toggleIsDirected());
    }

    function toggleIsWeighted() {
        setNodes(nodes => nodes.toggleIsWeighted());
    }

    const nodeRecordHandlers = {addNode, setEdgeByIndex, toggleIsDirected, toggleIsWeighted, deleteNode, setEdge};

    function getNodesList() {
        return nodesRecord.get("nodes");
    }

    function getNodeCount() {
        return nodesRecord.get("nodeCount");
    }

    function getEdgeByIndex({to, from}) {
        return nodesRecord.getEdgeByIndex({to, from});
    }

    function getEdge({to, from}) {
        return nodesRecord.getEdge({to, from});
    }

    function getIsWeighted() {
        return nodesRecord.get("isWeighted");
    }

    function getIsDirected() {
        return nodesRecord.get("isDirected");
    }

    function getNode(nodeId) {
        return nodesRecord.get("nodes").find(node=>node.id===nodeId);
    }

    function getNodeLabel(node) {
        return node.get("label");
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
    nodeRecordHandlers.getEdge = getEdge;
    nodeRecordHandlers.getNode = getNode;
    nodeRecordHandlers.getNodeLabel = getNodeLabel;

    return nodeRecordHandlers;
};

export function getStartAlgorithmHandlers(nodesRecord, setNodes, {setPointerLine}) {
    function resetNodes() {
        setNodes(nodesRecord => {
            const newNodes = nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
            return nodesRecord.set("nodes", newNodes);
        });
    }

    function setNodesRecord(newRecord) {
        setNodes(newRecord);
    }

    function setNodeStyle(nodeId, style) {
        setNodesRecord(oldNodesRecord => {
            const nodeIndex = oldNodesRecord.get("nodes").findIndex(node=>node.id===nodeId);
            console.log(nodeIndex, style)

            return oldNodesRecord.setIn(["nodes", nodeIndex, "style"], style);
        });
    }

    function getNodesIdList() {
        return nodesRecord.get("nodes").map(node=>node.id);
    }

    function getEdgesRepresentation(edgesRepresentation) {
        return edgesRecordToGraphRepresentation(nodesRecord.get("edgesRecord"), edgesRepresentation);
    }

    return {setNodesRecord, resetNodes, setNodeStyle, getNodesIdList, getEdgesRepresentation, setPointerLine};
};

export function getGraphCardHandlers(nodesRecord, setNodesRecord) {
    function getNodes() {
        return nodesRecord.nodes;
    }

    return {
        getNodes
    };
};