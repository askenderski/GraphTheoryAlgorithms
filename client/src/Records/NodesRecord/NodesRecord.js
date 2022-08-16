import {List, Record} from "immutable";
import AddNodesRecordPrototype from "./AddNodesRecordPrototype/AddNodesRecordPrototype";
import { NodeRecord } from "../NodeRecord/NodeRecord";
import { EdgeRecord } from "../EdgeRecord/EdgeRecord";

export const NodesRecord = Record({
    nodes: List([NodeRecord()]),
    nodeCount: 1,
    adjacencyMatrix: List.of(List.of(EdgeRecord({weighted: false}))),
    isWeighted: false,
    isDirected: false
});

AddNodesRecordPrototype(NodesRecord);

function getAdjacencyMatrixAsList({adjacencyMatrix, isWeighted}) {
    return List.of(...adjacencyMatrix.map((nodeRowArray, toIndex)=>List.of(
        ...nodeRowArray
            .map((value, fromIndex)=>
                EdgeRecord({value, to: toIndex, from: fromIndex, weighted: isWeighted}))
        )
    ));
}

const getNodeRecordByIndex = (_,i)=>NodeRecord({value: i.toString(), id: i});

export function NodesRecordFromGraphObject(graph) {
    const {adjacencyMatrix} = graph;
    
    const nodesArray = new Array(adjacencyMatrix.length).fill(1).map(getNodeRecordByIndex);
    const nodesList = List(nodesArray);
    
    const adjacencyMatrixAsList = getAdjacencyMatrixAsList(graph);

    const nodesRecord = NodesRecord({...graph, nodes: nodesList, adjacencyMatrix: adjacencyMatrixAsList});
    
    return nodesRecord;
};