import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";
import { selectNodesRecord, selectAlgorithmObject } from "../Store/algorithm/reducer";
import { algorithmActions } from "Store/store";
import { useSelector, useDispatch } from "react-redux";
import { INodesRecord } from "Records/NodesRecord/NodesRecord";
import { INodeRecord } from "Records/NodeRecord/NodeRecord";
import { ISpecificAlgorithmHandlers } from "./IHandlers";

const {mergeVariables: mergeVariablesAction, changeNodesRecord: changeNodesRecordAction} = algorithmActions;

export function useSpecificAlgorithmHandlers(): ISpecificAlgorithmHandlers {
    const algorithm = useSelector(selectAlgorithmObject);

    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);

    const setVariable = (name: string, value: any) => dispatch(mergeVariablesAction({[name]: value}));

    function getSetNodeStyleFunc({nodeId, style}: {nodeId: string, style: {[key in string]: any}}) {
        return function setNodeStyleFunc(nodesRecord: INodesRecord) {
            const nodeIndex = nodesRecord.get("nodes").findIndex((node: INodeRecord)=>node.get("id")===nodeId);
            const newRecord = nodesRecord.setIn(["nodes", nodeIndex, "style"], style);

            return newRecord;
        };
    }

    const setNodeStyle = (nodeId: string, style: {[key: string]: string}) => dispatch(changeNodesRecordAction(getSetNodeStyleFunc({nodeId, style})));

    function getNodesIdList() {
        return nodesRecord.get("nodes").map(node => node.get("id"));
    }

    function getEdgesRepresentation() {
        return edgesRecordToGraphRepresentation(nodesRecord.get("edgesRecord"), algorithm.graphRepresentation);
    }

    return {
        getNodesIdList, getEdgesRepresentation, setVariable, setNodeStyle
    };
}