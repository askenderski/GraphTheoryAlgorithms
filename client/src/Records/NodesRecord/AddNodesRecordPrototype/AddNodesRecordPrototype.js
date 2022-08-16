import {List} from "immutable";
import { EdgeRecord } from "../../EdgeRecord/EdgeRecord";
import { NodeRecord } from "../../NodeRecord/NodeRecord";

function directedToUndirectedAdjacencyMatrix(directedAdjacencyMatrix) {
    let matrix = directedAdjacencyMatrix;

    for (let fromIndex = 0; fromIndex < directedAdjacencyMatrix.size; fromIndex++) {
        for (let toIndex = 0; toIndex < directedAdjacencyMatrix.size; toIndex++) {
            const edgeValue = matrix.get(toIndex).get(fromIndex).get("value");
            
            if (edgeValue) matrix = matrix.setIn([fromIndex, toIndex, "value"], edgeValue);
        }
    }

    return matrix;
}

export default function AddNodesRecordPrototype(NodesRecord) {
    NodesRecord.prototype.getEdgeByIndex = function ({to, from}) {
        // console.log(this)
        const matrix = this.get("adjacencyMatrix");
        // console.log(matrix)
    
        return matrix.get(to).get(from);
    };
    
    NodesRecord.prototype.addNode = function (node = NodeRecord()) {
        const getEdge = (args)=>EdgeRecord({...args, weighted: this.get("isWeighted")});
        const recordWithNewCount = this.set("nodeCount", this.nodeCount + 1);
    
        let adjacencyMatrix = recordWithNewCount.get("adjacencyMatrix");
        //every column started by a to node with from nodes will add a new node at the end,
        //that being the newly added node, and it will have the default (0 or false) value
        let fromNodesMatrix = new List();
    
        for (let edgeColumnIndex = 0; edgeColumnIndex < adjacencyMatrix.size; edgeColumnIndex++) {
            const edgeColumn = adjacencyMatrix.get(edgeColumnIndex);

            //the current node column will add the default node at the end
            const edgeColumnWithNewFromNode = edgeColumn.push(
                getEdge({from: node.id, to: this.nodes.get(edgeColumnIndex)})
            );
    
            fromNodesMatrix = fromNodesMatrix.push(edgeColumnWithNewFromNode);
        }
    
        adjacencyMatrix = fromNodesMatrix;
    
        //the last column (the one where the destination is the new node) is empty as it isn't needed
        const columnOfNodesFromToNodeTo = List(new Array(recordWithNewCount.nodeCount)
            .fill(1).map((_, i)=>getEdge({from: i, to: node.id})));
    
        adjacencyMatrix = adjacencyMatrix.push(columnOfNodesFromToNodeTo);
    
        const recordWithNewCountAndEdges = recordWithNewCount.set("adjacencyMatrix", adjacencyMatrix);

        const finalRecord = recordWithNewCountAndEdges.set("nodes", recordWithNewCountAndEdges.get("nodes").push(node));
        return finalRecord;
    }
    
    NodesRecord.prototype.setEdgeByIndex = function({to, from}, {value}) {
        const edgeFromTo = ["adjacencyMatrix", to, from];
        const edgeToFrom = ["adjacencyMatrix", from, to];
    
        if (!this.get("isDirected")) {
            return this
                .setIn([...edgeFromTo, "value"], value)
                .setIn([...edgeFromTo, "from"], this.nodes.get(from).get("id"))
                .setIn([...edgeFromTo, "to"], this.nodes.get(to).get("id"))
                .setIn([...edgeToFrom, "value"], value)
                .setIn([...edgeToFrom, "from"], this.nodes.get(to).get("id"))
                .setIn([...edgeToFrom, "to"], this.nodes.get(from).get("id"));
        }
    
        return this
            .setIn([...edgeFromTo, "value"], value)
            .setIn([...edgeFromTo, "from"], this.nodes.get(from).get("id"))
            .setIn([...edgeFromTo, "to"], this.nodes.get(to).get("id"));
    }
    
    NodesRecord.prototype.toggleIsWeighted = function() {
        const wasWeighted = this.get("isWeighted");
        const nodesWithReversedWeight = this.set("isWeighted", !wasWeighted);
    
        const changeEdgeValueDependingOnWeightedness = wasWeighted ?
            //if the graph was weighted, the existing edges remain so
            edge => (edge.get("value") !== 0 ? edge.set("value", true) : edge.set("value", false)) :
            //if the graph wasn't weighted, the "true" edges become 1s
            edge => (edge.get("value") === true ? edge.set("value", 1) : edge.set("value", 0));
    
        const adjacencyMatrixWithReversedWeight = nodesWithReversedWeight
            .get("adjacencyMatrix")
            .map(nodeColumn=>nodeColumn.map(changeEdgeValueDependingOnWeightedness));
    
        return nodesWithReversedWeight.set("adjacencyMatrix", adjacencyMatrixWithReversedWeight);
    }
    
    NodesRecord.prototype.deleteNodeByIndex = function (nodeIndex) {
        if (this.nodeCount <= 0) return this;
    
        const nodesWithNewCount = this.set("nodeCount", this.nodeCount - 1);
    
        let adjacencyMatrixWithoutFromCells = this.get("adjacencyMatrix");

        for (let toIndex = 0; toIndex < this.get("nodeCount"); toIndex++) {
            adjacencyMatrixWithoutFromCells = adjacencyMatrixWithoutFromCells.deleteIn([toIndex, nodeIndex]);
        }
    
        const adjacencyMatrixWithoutFromCellsAndToCell = adjacencyMatrixWithoutFromCells.delete(nodeIndex);
    
        const nodesWithNewCountAndEdges = nodesWithNewCount.set("adjacencyMatrix", adjacencyMatrixWithoutFromCellsAndToCell);

        return nodesWithNewCountAndEdges.deleteIn(["nodes", nodeIndex]);
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