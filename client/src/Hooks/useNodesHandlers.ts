import { useDispatch, useSelector } from "react-redux";
import { selectInvalidateAlgorithm, selectNodesRecord } from "../Store/algorithm/reducer";
import { algorithmActions } from "../Store/store";
import { INodeRecord, getNodeRecord } from "../Records/NodeRecord/NodeRecord";
import {INodesRecord} from "../Records/NodesRecord/NodesRecord";
import { IEdgeRecord } from "Records/EdgeRecord/EdgeRecord";
import { INodesHandlers } from "./IHandlers";

const { changeNodesRecord: changeNodesRecordAction } = algorithmActions;

export default function useNodesHandlers(): INodesHandlers {
    const dispatch = useDispatch();

    const nodesRecord: INodesRecord = useSelector(selectNodesRecord);

    const invalidateAlgorithm = useSelector(selectInvalidateAlgorithm);

    function addNodeFunc(nodesRecord: INodesRecord) {
        let nodeValues = nodesRecord.get("nodes").map(node=>node.get("value")).sort();
        const value = nodeValues.find(val=>!nodeValues.includes(val+1))+1;
        return nodesRecord.addNode(getNodeRecord({value, label: value.toString()}));
    }

    const addNode = ()=>{
        return dispatch(changeNodesRecordAction(addNodeFunc));
    };

    function getDeleteNodeFunc(nodeId: string) {
        return function deleteNodeFunc(nodesRecord: INodesRecord) {
            return nodesRecord.deleteNodeById(nodeId);
        };
    }

    const deleteNode = (nodeId: string) => dispatch(changeNodesRecordAction(getDeleteNodeFunc(nodeId)));

    function getSetEdgeFunc({to, from}: {to: string, from: string}, value: any) {
        return (nodesRecord: INodesRecord) => nodesRecord.setEdge({to, from, value});
    }

    const setEdge = ({to, from}: {to: string, from: string}, value: any) =>
        dispatch(changeNodesRecordAction(getSetEdgeFunc({to, from}, value)));

    function toggleIsDirectedFunc(nodesRecord: INodesRecord) {
        return nodesRecord.toggleIsDirected();
    }

    const toggleIsDirected = ()=>dispatch(changeNodesRecordAction(toggleIsDirectedFunc));

    function toggleIsWeightedFunc(nodesRecord: INodesRecord) {
        return nodesRecord.toggleIsWeighted();
    }

    const toggleIsWeighted = ()=>dispatch(changeNodesRecordAction(toggleIsWeightedFunc));

    const nodeRecordHandlers: {[key:string]:any} =
        {addNode, toggleIsDirected, toggleIsWeighted, deleteNode, setEdge};

    function getNodesList() {
        return nodesRecord.get("nodes");
    }

    function getNodeCount() {
        return nodesRecord.get("nodeCount");
    }

    function getEdge({to, from}: {to: string, from: string}) {
        return nodesRecord.getEdge({to, from});
    }

    function getIsWeighted() {
        return nodesRecord.get("isWeighted");
    }

    function getIsDirected() {
        return nodesRecord.get("isDirected");
    }

    function getNode(nodeId: string) {
        return nodesRecord.get("nodes").find(node=>node.get("id")===nodeId);
    }

    function getNodeLabel(node: INodeRecord) {
        return node.get("label");
    }

    function getEdgeValue(edge: IEdgeRecord) {
        return edge.get("value");
    }

    Object.keys(nodeRecordHandlers).forEach(key=>{
        const originalFunc = nodeRecordHandlers[key] as Function;

        nodeRecordHandlers[key] = async function (...args: any[]) {
            await invalidateAlgorithm();
            return originalFunc.apply(nodeRecordHandlers, args);
        };
    })

    nodeRecordHandlers.getNodesList = getNodesList;
    nodeRecordHandlers.getNodeCount = getNodeCount;
    nodeRecordHandlers.getIsWeighted = getIsWeighted;
    nodeRecordHandlers.getIsDirected = getIsDirected;
    nodeRecordHandlers.getEdgeValue = getEdgeValue;
    nodeRecordHandlers.getEdge = getEdge;
    nodeRecordHandlers.getNode = getNode;
    nodeRecordHandlers.getNodeLabel = getNodeLabel;

    return nodeRecordHandlers as INodesHandlers;
};