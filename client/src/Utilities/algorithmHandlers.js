import { defaultNodeStyle } from "../Data/Algorithms/graph";

export function getNodesHandlers(setNodes, {invalidateAlgorithm}) {
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

    Object.keys(nodeRecordHandlers).forEach(key=>{
        const originalFunc = nodeRecordHandlers[key];

        nodeRecordHandlers[key] = async function (...args) {
            await invalidateAlgorithm();
            return originalFunc.apply(nodeRecordHandlers, args);
        };
    })

    return nodeRecordHandlers;
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