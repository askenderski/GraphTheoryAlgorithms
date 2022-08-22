import {List} from "immutable";
import { getEdgeRecord } from "../../EdgeRecord/EdgeRecord";
import { NodeRecord } from "../../NodeRecord/NodeRecord";

export default function AddNodesRecordPrototype(NodesRecord) {
    NodesRecord.prototype.getEdge = function ({to, from}) {
        return this
            .get("edgesRecord")
            .get("edgesFromRecord")
            .get("fromMap")
            .get(from)
            .get("toMap")
            .get(to);
    };
    
    NodesRecord.prototype.addNode = function (node = NodeRecord()) {
        const getEdge = (args)=>getEdgeRecord({...args, weighted: this.get("isWeighted")});
        const recordWithNewCount = this.set("nodeCount", this.nodeCount + 1);

        const recordWithNewCountAndNodes = recordWithNewCount.set("nodes", recordWithNewCount.get("nodes").push(node));

        const edgesFromCurNodeToAdd = new Array(recordWithNewCount.nodeCount)
            .fill(1).map((_,i)=>getEdge({
                from: node.id,
                to: recordWithNewCountAndNodes.get("nodes").get(i).get("id")
            }));
        const edgesToCurNodeToAdd = new Array(recordWithNewCount.nodeCount - 1)
            .fill(1).map((_,i)=>getEdge({
                to: node.id,
                from: recordWithNewCountAndNodes.get("nodes").get(i).get("id")
            }));

        const edgesToAdd = [...edgesFromCurNodeToAdd, ...edgesToCurNodeToAdd];
        
        const newEdgesRecord = this.get("edgesRecord").addEdges(...edgesToAdd);
        const finalRecord = recordWithNewCountAndNodes.set("edgesRecord", newEdgesRecord);

        return finalRecord;
    }

    NodesRecord.prototype.setEdge = function({to, from, value}) {
        let resEdgesRecord = this.get("edgesRecord").setEdge({to, from, value});
        
        if (!this.get("isDirected")) {
            resEdgesRecord = resEdgesRecord.setEdge({from: to, to: from, value});
        }
    
        return this.set("edgesRecord", resEdgesRecord);
    }
    
    NodesRecord.prototype.toggleIsWeighted = function() {
        const wasWeighted = this.get("isWeighted");
        const nodesWithReversedWeight = this.set("isWeighted", !wasWeighted);
    
        // const changeEdgeValueDependingOnWeightedness = wasWeighted ?
        //     //if the graph was weighted, the existing edges remain so
        //     edge => (edge.get("value") !== 0 ? edge.set("value", true) : edge.set("value", false)) :
        //     //if the graph wasn't weighted, the "true" edges become 1s
        //     edge => (edge.get("value") === true ? edge.set("value", 1) : edge.set("value", 0));
    
        return nodesWithReversedWeight;
    }

    NodesRecord.prototype.deleteNodeById = function (nodeId) {
        if (this.nodeCount <= 0) return this;
    
        const nodesWithNewCount = this.set("nodeCount", this.nodeCount - 1);
    
        const newEdgesRecord = this.get("edgesRecord").deleteEdgesForNode(nodeId);

        return nodesWithNewCount.set("nodes", this.nodes.filter(node=>node.id!==nodeId))
            .set("edgesRecord", newEdgesRecord);
    }

    NodesRecord.prototype.getNodeById = function (nodeId) {
        return this.nodes.find(node => node.id === nodeId);
    }
    
    NodesRecord.prototype.toggleIsDirected = function () {
        const wasDirected = this.get("isDirected");
        const nodesWithReversedDirected = this.set("isDirected", !wasDirected);
    
        if (wasDirected) {
            console.log("he")
            return nodesWithReversedDirected;
        }
    
        return nodesWithReversedDirected;
    }
}