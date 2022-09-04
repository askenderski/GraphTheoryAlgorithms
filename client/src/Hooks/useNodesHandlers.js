import { useDispatch, useSelector } from "react-redux";
import { changeNodesRecord as changeNodesRecordAction, selectInvalidateAlgorithm, selectNodesRecord, setNodesRecord as setNodesRecordAction } from "../Store/algorithm/algorithmSlice";
import { NodeRecord } from "../Records/NodeRecord/NodeRecord";

export default function useNodesHandlers() {
    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);
    const setNodesRecord = nodesRecord => dispatch(setNodesRecordAction(nodesRecord));

    const invalidateAlgorithm = useSelector(selectInvalidateAlgorithm);

    function addNodeFunc(nodesRecord) {
        let nodeValues = nodesRecord.nodes.map(node=>node.value).sort();
        const value = nodeValues.find(val=>!nodeValues.includes(val+1))+1;
        return nodesRecord.addNode(NodeRecord({value, label: value.toString()}));
    }

    const addNode = ()=>dispatch(changeNodesRecordAction(addNodeFunc));

    function getDeleteNodeFunc(nodeId) {
        return function deleteNodeFunc(nodesRecord) {
            return nodesRecord.deleteNodeById(nodeId);
        };
    }

    const deleteNode = nodeId => dispatch(changeNodesRecordAction(getDeleteNodeFunc(nodeId)));

    function getSetEdgeFunc({to, from}, value) {
        return nodesRecord => nodesRecord.setEdge({to, from, value});
    }

    const setEdge = ({to, from}, value) => dispatch(changeNodesRecordAction(getSetEdgeFunc({to, from}, value)));

    function toggleIsDirectedFunc(nodesRecord) {
        return nodesRecord.toggleIsDirected();
    }

    const toggleIsDirected = ()=>dispatch(changeNodesRecordAction(toggleIsDirectedFunc));

    function toggleIsWeightedFunc(nodesRecord) {
        return nodesRecord.toggleIsWeighted();
    }

    const toggleIsWeighted = ()=>dispatch(changeNodesRecordAction(toggleIsWeightedFunc));

    const nodeRecordHandlers = {addNode, toggleIsDirected, toggleIsWeighted, deleteNode, setEdge};

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