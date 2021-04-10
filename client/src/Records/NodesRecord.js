import {List, Record} from "immutable";

const nodesRecord = Record(
    {
        nodeCount: 1,
        nodeMatrix: List.of(List.of(true)),
        isWeighted: false,
        isDirected: false
    });

nodesRecord.prototype.getNode = function ({i, j}) {
    const matrix = this.get("nodeMatrix");

    return matrix.get(i).get(j);
};

function NodeMatrixAsListFromArray(nodeMatrixArray) {
    return List.of(...nodeMatrixArray.map(nodeRowArray=>List.of(...nodeRowArray)));
}

export const NodesRecord = nodesRecord;
export function NodesRecordFromGraphObject(graph) {
    return nodesRecord({...graph, nodeMatrix: NodeMatrixAsListFromArray(graph.adjacencyMatrix)});
}