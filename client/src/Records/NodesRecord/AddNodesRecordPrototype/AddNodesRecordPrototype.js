import {List} from "immutable";
import { EdgeRecord, getEdgeRecord } from "../../EdgeRecord/EdgeRecord";
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
    NodesRecord.prototype.getEdgeByIndex = function ({to: toIndex, from: fromIndex}) {
        const edgesFromRecord = this.get("edgesRecord").get("edgesFromRecord");
        const froms = edgesFromRecord.get("_froms");
        const edgesToRecord = froms.get(fromIndex);
        const tos = edgesToRecord.get("_tos");
        
        return tos.get(toIndex);
    };
    
    NodesRecord.prototype.addNode = function (node = NodeRecord()) {
        const getEdge = (args)=>getEdgeRecord({...args, weighted: this.get("isWeighted")});
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

        const recordWithNewCountEdgesAndNodes = recordWithNewCountAndEdges.set("nodes", recordWithNewCountAndEdges.get("nodes").push(node));

        const edgesFromCurNodeToAdd = new Array(recordWithNewCount.nodeCount)
            .fill(1).map((_,i)=>getEdge({
                from: node.id,
                to: recordWithNewCountEdgesAndNodes.get("nodes").get(i).get("id")
            }));
        const edgesToCurNodeToAdd = new Array(recordWithNewCount.nodeCount - 1)
            .fill(1).map((_,i)=>getEdge({
                to: node.id,
                from: recordWithNewCountEdgesAndNodes.get("nodes").get(i).get("id")
            }));

        const edgesToAdd = [...edgesFromCurNodeToAdd, ...edgesToCurNodeToAdd];
        
        const newEdgesRecord = this.get("edgesRecord").addEdges(...edgesToAdd);
        const finalRecord = recordWithNewCountEdgesAndNodes.set("edgesRecord", newEdgesRecord);

        return finalRecord;
    }

    NodesRecord.prototype.setNodeByIndex = function(nodeIndex, node) {
        const prevNodeObj = this.get("nodes").get(nodeIndex).toObject();
        const nodeRecordArg = {...prevNodeObj, ...node};
        const nodeRecord = NodeRecord(nodeRecordArg);

        const newNodesRecord = this.setIn(
            ["nodes", nodeIndex],
            nodeRecord
        );
        return newNodesRecord;
    }

    NodesRecord.prototype.setEdge = function({to, from, value}) {
        return this.set("edgesRecord", this.get("edgesRecord").setEdge({to, from, value}));   
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
                .setIn([...edgeToFrom, "to"], this.nodes.get(from).get("id"))
                .setEdge({
                    to: this.nodes.get(to).get("id"),
                    from: this.nodes.get(from).get("id"),
                    value
                });
        }
    
        return this
            .setIn([...edgeFromTo, "value"], value)
            .setIn([...edgeFromTo, "from"], this.nodes.get(from).get("id"))
            .setIn([...edgeFromTo, "to"], this.nodes.get(to).get("id"))
            .setEdge({
                to: this.nodes.get(to).get("id"),
                from: this.nodes.get(from).get("id"),
                value
            });
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

    NodesRecord.prototype.deleteNodeById = function (nodeId) {
        return this.deleteNodeByIndex(this.nodes.findIndex(node=>node.id === nodeId));
    }

    NodesRecord.prototype.getNodeById = function (nodeId) {
        return this.nodes.find(node => node.id === nodeId);
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