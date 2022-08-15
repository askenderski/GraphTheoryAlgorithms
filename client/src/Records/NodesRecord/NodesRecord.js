import {List, Record} from "immutable";
import AddNodesRecordPrototype from "./AddNodesRecordPrototype/AddNodesRecordPrototype";
import { NodeRecord } from "../NodeRecord/NodeRecord";

export const NodesRecord = Record({
    nodes: List(NodeRecord()),
    nodeCount: 1,
    adjacencyMatrix: List.of(List.of(true)),
    isWeighted: false,
    isDirected: false
});

AddNodesRecordPrototype(NodesRecord);

function AdjacencyMatrixAsListFromArray(adjacencyMatrixArray) {
    return List.of(...adjacencyMatrixArray.map(nodeRowArray=>List.of(...nodeRowArray)));
}

const getNodeRecordByIndex = (_,i)=>NodeRecord({value: i, id: i});

export function NodesRecordFromGraphObject(graph) {
    const {adjacencyMatrix} = graph;
    
    const nodesArray = new Array(adjacencyMatrix.length).fill(1).map(getNodeRecordByIndex);
    const nodesList = List(nodesArray);
    
    const adjacencyMatrixAsList =  AdjacencyMatrixAsListFromArray(adjacencyMatrix);

    const nodesRecord = NodesRecord({...graph, nodes: nodesList, adjacencyMatrix: adjacencyMatrixAsList});
    
    return nodesRecord;
};