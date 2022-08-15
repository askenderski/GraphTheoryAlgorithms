import {List} from "immutable";

function directedToUndirectedAdjacencyMatrix(directedAdjacencyMatrix) {
    let matrix = directedAdjacencyMatrix;

    for (let fromIndex = 0; fromIndex < directedAdjacencyMatrix.size; fromIndex++) {
        for (let toIndex = 0; toIndex < directedAdjacencyMatrix.size; toIndex++) {
            const edgeValue = matrix.get(toIndex).get(fromIndex);
            
            if (edgeValue) matrix = matrix.setIn([fromIndex, toIndex], edgeValue);
        }
    }

    return matrix;
}

export default function AddNodesRecordPrototype(NodesRecord) {
    NodesRecord.prototype.getEdge = function ({to, from}) {
        // console.log(this)
        const matrix = this.get("adjacencyMatrix");
        // console.log(matrix)
    
        return matrix.get(to).get(from);
    };
    
    NodesRecord.prototype.addNode = function () {
        const defaultEdge = this.get("isWeighted") ? 0 : false;
        const edgesWithNewCount = this.set("nodeCount", this.nodeCount + 1);
    
        let adjacencyMatrix = edgesWithNewCount.get("adjacencyMatrix");
        //every column started by a to node with from nodes will add a new node at the end,
        //that being the newly added node, and it will have the default (0 or false) value
        let fromNodesMatrix = new List();
    
        for (let edgeColumn of adjacencyMatrix) {
            //the current node column will add the default node at the end
            const edgeColumnWithNewFromNode = edgeColumn.push(defaultEdge);
    
            fromNodesMatrix = fromNodesMatrix.push(edgeColumnWithNewFromNode);
        }
    
        adjacencyMatrix = fromNodesMatrix;
    
        //the last column (the one where the destination is the new node) is empty as it isn't needed
        const columnOfNodesFromToNodeTo = List.of(...new Array(edgesWithNewCount.nodeCount).fill(defaultEdge));
    
        adjacencyMatrix = adjacencyMatrix.push(columnOfNodesFromToNodeTo);
    
        return edgesWithNewCount.set("adjacencyMatrix", adjacencyMatrix);
    }
    
    NodesRecord.prototype.setEdge = function({to, from}, val) {
        const edgeFromTo = ["adjacencyMatrix", to, from];
        const edgeToFrom = ["adjacencyMatrix", from, to];
    
        if (!this.get("isDirected")) {
            return this.setIn(edgeFromTo, val).setIn(edgeToFrom, val);
        }
    
        return this.setIn(edgeFromTo, val);
    }
    
    NodesRecord.prototype.toggleIsWeighted = function() {
        const wasWeighted = this.get("isWeighted");
        const nodesWithReversedWeight = this.set("isWeighted", !wasWeighted);
    
        const changeEdgeValueDependingOnWeightedness = wasWeighted ?
            //if the graph was weighted, the existing edges remain so
            edge => edge !== 0 ? true : false :
            //if the graph wasn't weighted, the "true" edges become 1s
            edge => edge ? 1 : 0;
    
        const adjacencyMatrixWithReversedWeight = nodesWithReversedWeight
            .get("adjacencyMatrix")
            .map(nodeColumn=>nodeColumn.map(changeEdgeValueDependingOnWeightedness));
    
        return nodesWithReversedWeight.set("adjacencyMatrix", adjacencyMatrixWithReversedWeight);
    }
    
    NodesRecord.prototype.deleteNode = function (nodeIndex) {
        if (this.nodeCount <= 0) return this;
    
        const nodesWithNewCount = this.set("nodeCount", this.nodeCount - 1);
    
        let adjacencyMatrixWithoutFromCells = this.get("adjacencyMatrix");

        for (let toIndex = 0; toIndex < this.get("nodeCount"); toIndex++) {
            adjacencyMatrixWithoutFromCells = adjacencyMatrixWithoutFromCells.deleteIn([toIndex, nodeIndex]);
        }
    
        const adjacencyMatrixWithoutFromCellsAndToCell = adjacencyMatrixWithoutFromCells.delete(nodeIndex);
        console.log(adjacencyMatrixWithoutFromCellsAndToCell)
    
        return nodesWithNewCount.set("adjacencyMatrix", adjacencyMatrixWithoutFromCellsAndToCell);
    }
    
    NodesRecord.prototype.toggleIsDirected = function () {
        const wasDirected = this.get("isDirected");
        const nodesWithReversedDirected = this.set("isDirected", !wasDirected);
    
        if (wasDirected) {
            return nodesWithReversedDirected.set("adjacencyMatrix",
                directedToUndirectedAdjacencyMatrix(this.get("adjacencyMatrix"))
            );
        }
    
        return nodesWithReversedDirected;
    }
}