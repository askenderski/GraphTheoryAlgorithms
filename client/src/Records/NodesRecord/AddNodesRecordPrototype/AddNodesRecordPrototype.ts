import { List } from "immutable";
import { getEdgeRecord, IEdgeRecord, IEdgeStyle } from "../../EdgeRecord/EdgeRecord";
import { getNodeRecord } from "../../NodeRecord/NodeRecord";
import { INodesRecord } from "../NodesRecord";

export default function AddNodesRecordPrototype(NodesRecord: {prototype: {[key: string]: any}}) {
    NodesRecord.prototype.getEdge = function ({to, from}: {to: string, from: string}) {
        return this
            .get("edgesRecord")
            .get("edgesFromRecord")
            .get("fromMap")
            .get(from)
            .get("toMap")
            .get(to);
    };
    
    NodesRecord.prototype.addNode = function (node = getNodeRecord()) {
        const getEdge = (args: {
                value?: number | boolean, style?: IEdgeStyle,
                id?: string, from: string, to: string
            })=>getEdgeRecord({...args, weighted: this.get("isWeighted")});
        const recordWithNewCount = this.set("nodeCount", this.nodeCount + 1);

        const recordWithNewCountAndNodes = recordWithNewCount.set("nodes", recordWithNewCount.get("nodes").push(node));

        const edgesFromCurNodeToAdd = new Array(recordWithNewCount.nodeCount)
            .fill(1).map((_,i)=>getEdge({
                from: node.get("id"),
                to: (recordWithNewCountAndNodes.get("nodes").get(i).get("id") as string)
            }));
        const edgesToCurNodeToAdd = new Array(recordWithNewCount.nodeCount - 1)
            .fill(1).map((_,i)=>getEdge({
                to: node.get("id"),
                from: recordWithNewCountAndNodes.get("nodes").get(i).get("id")
            }));

        const edgesToAdd = [...edgesFromCurNodeToAdd, ...edgesToCurNodeToAdd];
        
        const newEdgesRecord = this.get("edgesRecord").addEdges(...edgesToAdd);
        const finalRecord = recordWithNewCountAndNodes.set("edgesRecord", newEdgesRecord);

        return finalRecord;
    }

    NodesRecord.prototype.setEdge = function({to, from, value}: {to: string, from: string, value: number | boolean}) {
        let resEdgesRecord = this.get("edgesRecord").setEdge({to, from, value});
        
        if (!this.get("isDirected")) {
            resEdgesRecord = resEdgesRecord.setEdge({from: to, to: from, value});
        }
    
        return this.set("edgesRecord", resEdgesRecord);
    }
    
    NodesRecord.prototype.toggleIsWeighted = function() {
        const wasWeighted = this.get("isWeighted");
        const nodesWithReversedWeight = this.set("isWeighted", !wasWeighted);
    
        const changeEdgeValueDependingOnWeightedness = wasWeighted ?
            //if the graph was weighted, the existing edges remain so
            (edge: IEdgeRecord) => (edge.get("value") !== 0 ?
                edge.set("value", true).set("weighted", false) :
                edge.set("value", false).set("weighted", false)) :
            //if the graph wasn't weighted, the "true" edges become 1s
            (edge: IEdgeRecord) => (edge.get("value") === true ?
                edge.set("value", 1).set("weighted", true) :
                edge.set("value", 0).set("weighted", true));

        let newEdgesRecord = nodesWithReversedWeight.edgesRecord;
        newEdgesRecord._edges.forEach((edge: IEdgeRecord)=>{
            const newEdge = changeEdgeValueDependingOnWeightedness(edge);
            newEdgesRecord = newEdgesRecord.setEdge(newEdge);
        });
    
        return nodesWithReversedWeight
            .set("edgesRecord", newEdgesRecord);
    }

    NodesRecord.prototype.deleteNodeById = function (nodeId: string) {
        if (this.nodeCount <= 0) return this;
    
        const nodesWithNewCount = this.set("nodeCount", this.nodeCount - 1);
    
        const newEdgesRecord = this.get("edgesRecord").deleteEdgesForNode(nodeId);

        return nodesWithNewCount.set("nodes", (this as INodesRecord).get("nodes")
            .filter(node=>node.get("id")!==nodeId))
            .set("edgesRecord", newEdgesRecord);
    }

    NodesRecord.prototype.getNodeById = function (nodeId: string) {
        const object = this as INodesRecord;

        return object.get("nodes").find(node => node.get("id") === nodeId);
    }
    
    NodesRecord.prototype.toggleIsDirected = function () {
        const wasDirected = this.get("isDirected");
        const nodesWithReversedDirected = this.set("isDirected", !wasDirected);
    
        if (wasDirected) {
            let res = nodesWithReversedDirected as INodesRecord;
            
            (nodesWithReversedDirected.get("edgesRecord").get("_edges") as List<IEdgeRecord>)
                .sort((edge1, edge2)=>{
                    const edge1NodeIndex = res.get("nodes").findIndex(node=>node.get("id")===edge1.get("from"));
                    const edge2NodeIndex = res.get("nodes").findIndex(node=>node.get("id")===edge2.get("from"));
                    
                    if (edge1NodeIndex > edge2NodeIndex) return 1;
                    else return 0;
                })
                .forEach(edge=>{
                    if (edge.get("value") !== false && edge.get("value") !== 0) {
                        res = res.setEdge({to: edge.get("from"), from: edge.get("to"), value: edge.get("value")});
                    }
                });

            return res;
        }
    
        return nodesWithReversedDirected;
    }
}