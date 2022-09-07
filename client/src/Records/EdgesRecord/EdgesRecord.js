import { List, Map, Record } from "immutable";

const EdgesToRecord = Record({
    from: undefined,
    _tos: List(),
    toMap: Map()
});

EdgesToRecord.prototype.deleteEdgesForNode = function (nodeId) {
    return this
        .set("_tos", this.get("_tos").filter(edge=>edge.to !== nodeId))
        .set("toMap", this.get("toMap").filter((_, to)=>to!==nodeId));
}

EdgesToRecord.prototype.addEdge = function (edge) {
    let edgesToRecord = this;
    edgesToRecord = edgesToRecord.setIn(["toMap", edge.to], edge);
    edgesToRecord = edgesToRecord.set("_tos", edgesToRecord.get("_tos").push(edge));

    return edgesToRecord;
};

EdgesToRecord.prototype.setEdge = function ({to, value}) {
    const newTos = this
        .setIn(["toMap", to, "value"], value)
        .setIn(["_tos",
            this.get("_tos").findIndex(edge => edge.to === to),
            "value"
        ], value);
    return newTos;
}

const EdgesFromRecord = Record({
    fromMap: Map(),
    _froms: List()
});

EdgesFromRecord.prototype.deleteEdgesForNode = function(nodeId) {
    let res = this;
    res = res.set("_froms", res.get("_froms").filter(edgesToRecord=>edgesToRecord.from !== nodeId));
    res = res.set("fromMap", res.fromMap.filter((_, from)=>from !== nodeId));
    
    res.fromMap.keySeq().forEach(from=>{
        const newEdgesToRecord = res.fromMap.get(from).deleteEdgesForNode(nodeId);
        res = res.setIn(["fromMap", from], newEdgesToRecord);
    })

    return res;
}

EdgesFromRecord.prototype.setEdge = function({from, to, value}) {
    const prevEdgesToRecord = this.get("fromMap").get(from);
    const newEdgesToRecord = prevEdgesToRecord.setEdge({from, to, value});

    return this
        .setIn(["fromMap", from], newEdgesToRecord)
        .setIn(["_froms", this.get("_froms").map((edgesTo,i)=>[edgesTo, i])
            .filter(([edgesTo])=>edgesTo.from === from).get(0)[1]], newEdgesToRecord);
};

EdgesFromRecord.prototype.addEdge = function (edge) {
    let edgesFromRecord = this;

    if (!edgesFromRecord.get("fromMap").has(edge.from)) {
        const edgesToRecord = EdgesToRecord({from: edge.from});

        edgesFromRecord = edgesFromRecord.setIn(["fromMap", edge.from], edgesToRecord);

        const curFroms = edgesFromRecord.get("_froms");
        const newFroms = curFroms.push(edgesToRecord);

        edgesFromRecord = edgesFromRecord.set("_froms", newFroms);
    }

    const curEdgesToRecord = edgesFromRecord.get("fromMap").get(edge.from);
    const newEdgesToRecord = curEdgesToRecord.addEdge(edge);

    edgesFromRecord = edgesFromRecord.setIn(
        ["fromMap", edge.from],
        newEdgesToRecord
    );

    edgesFromRecord = edgesFromRecord.set(
        "_froms",
        edgesFromRecord.get("_froms").filter(edgeRecord => edgeRecord !== curEdgesToRecord)
    );

    edgesFromRecord = edgesFromRecord.set(
        "_froms",
        edgesFromRecord.get("_froms").push(newEdgesToRecord)
    );

    return edgesFromRecord;
};

export const EdgesRecord = Record({
    edgesFromRecord: EdgesFromRecord(),
    _edges: List()
});

EdgesRecord.prototype.deleteEdgesForNode = function(nodeId) {
    let res = this;
    res = res.set("_edges", res.get("_edges").filter(edge=>edge.from !== nodeId && edge.to !== nodeId));
    return res.set("edgesFromRecord", res.edgesFromRecord.deleteEdgesForNode(nodeId));
}

EdgesRecord.prototype.addEdge = function(edge) {
    let edgesRecord = this;
    edgesRecord = edgesRecord.set("_edges", edgesRecord.get("_edges").push(edge));
    edgesRecord = edgesRecord.set("edgesFromRecord", edgesRecord.get("edgesFromRecord").addEdge(edge));
    return edgesRecord;
};

EdgesRecord.prototype.addEdges = function(...edges) {
    let edgesRecord = this;

    edges.forEach(edge => {
        edgesRecord = edgesRecord.addEdge(edge);
    });

    return edgesRecord;
};

EdgesRecord.prototype.setEdge = function({from, to, value}) {
    return this
        .setIn(
            [
                "_edges",
                this.get("_edges")
                    .map((edge,i)=>[edge, i])
                    .filter(([edge])=>edge.from === from && edge.to === to).get(0)[1],
                "value"
            ],
            value
        )
        .set("edgesFromRecord", this.get("edgesFromRecord").setEdge({from, to, value}));
}

export const getEdgesRecord = (edgesArray) => {
    const edges = List(edgesArray);

    let res = EdgesRecord().addEdges(...edges);

    return res;
};