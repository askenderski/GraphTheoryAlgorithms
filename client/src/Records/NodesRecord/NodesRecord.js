import {List, Record} from "immutable";
import AddNodesRecordPrototype from "./AddNodesRecordPrototype/AddNodesRecordPrototype";
import { NodeRecord } from "../NodeRecord/NodeRecord";
import { EdgeRecord } from "../EdgeRecord/EdgeRecord";
import { getEdgesRecord } from "../EdgesRecord/EdgesRecord";
import { EdgesRecord } from "../EdgesRecord/EdgesRecord";

export const NodesRecord = Record({
    nodes: List([NodeRecord()]),
    nodeCount: 1,
    adjacencyMatrix: List.of(List.of(EdgeRecord({weighted: false}))),
    edgesRecord: EdgesRecord(),
    isWeighted: false,
    isDirected: false
});

AddNodesRecordPrototype(NodesRecord);

function getAdjacencyMatrixAsList({adjacencyMatrix, isWeighted}, nodesList) {
    return List.of(...adjacencyMatrix.map((nodeRowArray, toIndex)=>List.of(
        ...nodeRowArray
            .map((value, fromIndex)=>
                EdgeRecord({
                    value, to: nodesList.get(toIndex).get("id"),
                    from: nodesList.get(fromIndex).get("id"), weighted: isWeighted
                }))
        )
    ));
}

const getNodeRecordByIndex = (_,i)=>NodeRecord({value: i, label: i.toString()});

export function getNodesRecordFromGraphObject(graph) {
    const {adjacencyMatrix} = graph;
    
    const nodesArray = new Array(adjacencyMatrix.length).fill(1).map(getNodeRecordByIndex);
    const nodesList = List(nodesArray);
    
    const adjacencyMatrixAsList = getAdjacencyMatrixAsList(graph, nodesList);
    const edgesRecord = getEdgesRecord(adjacencyMatrixAsList.flatten(2));

    const nodesRecord = NodesRecord({...graph, edgesRecord, nodes: nodesList, adjacencyMatrix: adjacencyMatrixAsList});
    
    return nodesRecord;
};