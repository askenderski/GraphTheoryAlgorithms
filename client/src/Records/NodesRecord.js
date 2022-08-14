import {List, Record} from "immutable";

function directedToUndirectedNodeMatrix(directedNodeMatrix) {
    let matrix = directedNodeMatrix;

    for (let fromIndex = 0; fromIndex < directedNodeMatrix.size; fromIndex++) {
        for (let toIndex = 0; toIndex < directedNodeMatrix.size; toIndex++) {
            const cellValue = matrix.get(toIndex).get(fromIndex);
            console.log(cellValue, toIndex, fromIndex)

            if (cellValue) matrix = matrix.setIn([fromIndex, toIndex], cellValue);
        }
    }

    return matrix;
}

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

nodesRecord.prototype.addNode = function () {
    const defaultNode = this.get("isWeighted") ? 0 : false;
    const nodesWithNewCount = this.set("nodeCount", this.nodeCount + 1);

    let nodeMatrix = nodesWithNewCount.get("nodeMatrix");
    //every column started by a to node with from nodes will add a new node at the end,
    //that being the newly added node, and it will have the default (0 or false) value
    let fromNodesMatrix = new List();

    for (let nodeColumn of nodeMatrix) {
        //the current node column will add the default node at the end
        const nodeColumnWithNewFromNode = nodeColumn.push(defaultNode);

        fromNodesMatrix = fromNodesMatrix.push(nodeColumnWithNewFromNode);
    }

    nodeMatrix = fromNodesMatrix;

    //the last column (the one where the destination is the new node) is empty as it isn't needed
    const columnOfNodesFromToNodeTo = List.of(...new Array(nodesWithNewCount.nodeCount).fill(defaultNode));

    nodeMatrix = nodeMatrix.push(columnOfNodesFromToNodeTo);

    return nodesWithNewCount.set("nodeMatrix", nodeMatrix);
}

nodesRecord.prototype.setNode = function({i, j}, val) {
    const fromJToI = ["nodeMatrix", i, j];
    const fromIToJ = ["nodeMatrix", j, i];


    if (!this.get("isDirected")) {
        return this.setIn(fromJToI, val).setIn(fromIToJ, val);
    }

    return this.setIn(fromJToI, val);
}

nodesRecord.prototype.toggleIsWeighted = function() {
    const wasWeighted = this.get("isWeighted");
    const nodesWithReversedWeight = this.set("isWeighted", !wasWeighted);

    const changeNodeValueDependingOnWeightedness = wasWeighted ?
        //if the graph was weighted, the existing edges remain so
        nodeCell => nodeCell !== 0 ? true : false :
        //if the graph wasn't weighted, the "true" edges become 1s
        nodeCell => nodeCell ? 1 : 0;

    const nodeMatrixWithReversedWeight = nodesWithReversedWeight
        .get("nodeMatrix")
        .map(nodeColumn=>
                nodeColumn
                .map(edge=>edge ? 1 : 0)
            );

    return nodesWithReversedWeight.set("nodeMatrix", nodeMatrixWithReversedWeight);
}

nodesRecord.prototype.deleteNode = function (i) {
    if (this.nodeCount <= 0) return this;

    const nodesWithNewCount = this.set("nodeCount", this.nodeCount - 1);

    const nodeMatrixWithoutFromCells = this.get("nodeMatrix")
        .reduce((curList, nodeRow) => {
            return curList.push(nodeRow.delete(i));
        }, List());

    const nodeMatrixWithoutFromCellsAndToCell = nodeMatrixWithoutFromCells.delete(i);

    return nodesWithNewCount.set("nodeMatrix", nodeMatrixWithoutFromCellsAndToCell);
}

nodesRecord.prototype.toggleIsDirected = function () {
    const wasDirected = this.get("isDirected");
    const nodesWithReversedDirected = this.set("isDirected", !wasDirected);

    if (wasDirected) {
        return nodesWithReversedDirected.set("nodeMatrix",
            directedToUndirectedNodeMatrix(this.get("nodeMatrix"))
        );
    }

    return nodesWithReversedDirected;
}

function NodeMatrixAsListFromArray(nodeMatrixArray) {
    return List.of(...nodeMatrixArray.map(nodeRowArray=>List.of(...nodeRowArray)));
}

export const NodesRecord = nodesRecord;
export function NodesRecordFromGraphObject(graph) {
    return nodesRecord({...graph, nodeMatrix: NodeMatrixAsListFromArray(graph.adjacencyMatrix)});
}