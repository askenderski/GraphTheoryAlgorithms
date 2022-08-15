import {List, Record} from "immutable";

function directedToUndirectedAdjacencyMatrix(directedAdjacencyMatrix) {
    let matrix = directedAdjacencyMatrix;

    for (let fromIndex = 0; fromIndex < directedAdjacencyMatrix.size; fromIndex++) {
        for (let toIndex = 0; toIndex < directedAdjacencyMatrix.size; toIndex++) {
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
        adjacencyMatrix: List.of(List.of(true)),
        isWeighted: false,
        isDirected: false
    });

nodesRecord.prototype.getNode = function ({i, j}) {
    const matrix = this.get("adjacencyMatrix");

    return matrix.get(i).get(j);
};

nodesRecord.prototype.addNode = function () {
    const defaultNode = this.get("isWeighted") ? 0 : false;
    const nodesWithNewCount = this.set("nodeCount", this.nodeCount + 1);

    let adjacencyMatrix = nodesWithNewCount.get("adjacencyMatrix");
    //every column started by a to node with from nodes will add a new node at the end,
    //that being the newly added node, and it will have the default (0 or false) value
    let fromNodesMatrix = new List();

    for (let nodeColumn of adjacencyMatrix) {
        //the current node column will add the default node at the end
        const nodeColumnWithNewFromNode = nodeColumn.push(defaultNode);

        fromNodesMatrix = fromNodesMatrix.push(nodeColumnWithNewFromNode);
    }

    adjacencyMatrix = fromNodesMatrix;

    //the last column (the one where the destination is the new node) is empty as it isn't needed
    const columnOfNodesFromToNodeTo = List.of(...new Array(nodesWithNewCount.nodeCount).fill(defaultNode));

    adjacencyMatrix = adjacencyMatrix.push(columnOfNodesFromToNodeTo);

    return nodesWithNewCount.set("adjacencyMatrix", adjacencyMatrix);
}

nodesRecord.prototype.setNode = function({i, j}, val) {
    const fromJToI = ["adjacencyMatrix", i, j];
    const fromIToJ = ["adjacencyMatrix", j, i];

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

    const adjacencyMatrixWithReversedWeight = nodesWithReversedWeight
        .get("adjacencyMatrix")
        .map(nodeColumn=>
                nodeColumn
                .map(changeNodeValueDependingOnWeightedness)
            );

    return nodesWithReversedWeight.set("adjacencyMatrix", adjacencyMatrixWithReversedWeight);
}

nodesRecord.prototype.deleteNode = function (i) {
    if (this.nodeCount <= 0) return this;

    const nodesWithNewCount = this.set("nodeCount", this.nodeCount - 1);

    const adjacencyMatrixWithoutFromCells = this.get("adjacencyMatrix")
        .reduce((curList, nodeRow) => {
            return curList.push(nodeRow.delete(i));
        }, List());

    const adjacencyMatrixWithoutFromCellsAndToCell = adjacencyMatrixWithoutFromCells.delete(i);

    return nodesWithNewCount.set("adjacencyMatrix", adjacencyMatrixWithoutFromCellsAndToCell);
}

nodesRecord.prototype.toggleIsDirected = function () {
    const wasDirected = this.get("isDirected");
    const nodesWithReversedDirected = this.set("isDirected", !wasDirected);

    if (wasDirected) {
        return nodesWithReversedDirected.set("adjacencyMatrix",
            directedToUndirectedAdjacencyMatrix(this.get("adjacencyMatrix"))
        );
    }

    return nodesWithReversedDirected;
}

function AdjacencyMatrixAsListFromArray(adjacencyMatrixArray) {
    return List.of(...adjacencyMatrixArray.map(nodeRowArray=>List.of(...nodeRowArray)));
}

export const NodesRecord = nodesRecord;
export function NodesRecordFromGraphObject(graph) {
    return nodesRecord({...graph, adjacencyMatrix: AdjacencyMatrixAsListFromArray(graph.adjacencyMatrix)});
}