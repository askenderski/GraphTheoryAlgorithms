import {List, Record} from "immutable";
import AddNodesRecordPrototype from "./AddNodesRecordPrototype/AddNodesRecordPrototype";

export const NodesRecord = Record({
    nodeCount: 1,
    adjacencyMatrix: List.of(List.of(true)),
    isWeighted: false,
    isDirected: false
});

AddNodesRecordPrototype(NodesRecord);

function AdjacencyMatrixAsListFromArray(adjacencyMatrixArray) {
    return List.of(...adjacencyMatrixArray.map(nodeRowArray=>List.of(...nodeRowArray)));
}

export function NodesRecordFromGraphObject(graph) {
    return nodesRecord({...graph, adjacencyMatrix: AdjacencyMatrixAsListFromArray(graph.adjacencyMatrix)});
}''