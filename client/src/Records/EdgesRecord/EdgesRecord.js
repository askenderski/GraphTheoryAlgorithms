import { List, Map, Record } from "immutable";

const EdgesToRecord = Record({
    from: undefined,
    _tos: List(),
    toMap: Map()
});

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

const getEdgesToRecord = ({nodes, tosArrayOfEdges, fromId}) => {
    const toIdsAndIndexTuples = tosArrayOfEdges.map((_,i)=>[nodes.get(i).get("id"), i]);

    let toMap = Map();
    let tos = List();

    toIdsAndIndexTuples.forEach(([id, i])=>{
        const edge = tosArrayOfEdges.get(i);
        toMap = toMap.set(id, edge);
        tos = tos.push(edge);
    });

    return EdgesToRecord({_tos: tos, toMap, from: fromId});
};

const EdgesFromRecord = Record({
    fromMap: Map(),
    _froms: List()
});

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

const getEdgesFromRecord = ({adjacencyMatrixOfEdges, nodes}) => {
    const fromIdsAndIndexTuples = adjacencyMatrixOfEdges.map((_,i)=>[nodes.get(i).get("id"), i]);
    
    let fromMap = Map();
    let froms = List();
    
    fromIdsAndIndexTuples.forEach(([id, index])=>{
        const edgesToRecord = getEdgesToRecord({nodes, fromId: id, tosArrayOfEdges: adjacencyMatrixOfEdges.get(index)});
        fromMap = fromMap.set(id, edgesToRecord);
        froms = froms.push(edgesToRecord);
    });

    return EdgesFromRecord({
        fromMap,
        _froms: froms
    });
};

export const EdgesRecord = Record({
    edgesFromRecord: EdgesFromRecord(),
    _edges: List()
});

EdgesRecord.prototype.addEdge = function(edge) {
    let edgesRecord = this;
    edgesRecord = edgesRecord.set("_edges", edgesRecord.get("_edges").push(edge));
    edgesRecord = edgesRecord.set("edgesFromRecord", edgesRecord.get("edgesFromRecord").addEdge(edge));
    return edgesRecord;
};

EdgesRecord.prototype.addEdges = function(...edges) {
    let edgeRecord = this;

    edges.forEach(edge => {
        edgeRecord = edgeRecord.addEdge(edge);
    });

    return edgeRecord;
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

export const getEdgesRecord = (adjacencyMatrixOfEdges, nodes) => {
    const edgesFromRecord = getEdgesFromRecord({adjacencyMatrixOfEdges, nodes});
    const edges = adjacencyMatrixOfEdges.flatten(2);

    return EdgesRecord({
        _edges: edges,
        edgesFromRecord
    });
};