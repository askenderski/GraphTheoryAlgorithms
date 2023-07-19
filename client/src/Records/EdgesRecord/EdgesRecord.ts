import { IEdgeRecord } from "Records/EdgeRecord/EdgeRecord";
import { List, Map, Record } from "immutable";

interface IEdgesToRecordInternal {
    from: string,
    _tos: List<IEdgeRecord>,
    toMap: Map<string, IEdgeRecord>,
}

export interface IEdgesToRecord extends Record<IEdgesToRecordInternal> {
    deleteEdgesForNode(nodeId: string): IEdgesToRecord,
    addEdge(edge: IEdgeRecord): IEdgesToRecord,
    setEdge({to, value}: {to: string, value: number | boolean}): IEdgesToRecord
}

const EdgesToRecord = Record<IEdgesToRecordInternal>({
    from: "",
    _tos: List(),
    toMap: Map()
});

function getEdgesToRecord(props: {from: string}) {
    return EdgesToRecord(props) as unknown as IEdgesToRecord;
}

EdgesToRecord.prototype.deleteEdgesForNode = function (nodeId: string) {
    const object = this as IEdgesToRecord;

    const tosList = object.get("_tos");
    const toMap = object.get("toMap");

    return this
        .set("_tos", tosList.filter(edge=>edge.get("to") !== nodeId))
        .set("toMap", toMap.filter((_, to)=>to!==nodeId));
}

EdgesToRecord.prototype.addEdge = function(edge: IEdgeRecord) {
    let edgesToRecord = this;
    edgesToRecord = edgesToRecord.setIn(["toMap", edge.get("to")], edge);
    edgesToRecord = edgesToRecord.set("_tos", edgesToRecord.get("_tos").push(edge));

    return edgesToRecord;
};

EdgesToRecord.prototype.setEdge = function ({to, value}: {to: string, value: number | boolean}) {
    const object = this as IEdgesToRecord;

    const newTos = object
        .setIn(["toMap", to, "value"], value)
        .setIn(["_tos",
            object.get("_tos").findIndex(edge => edge.get("to") === to),
            "value"
        ], value);
    return newTos;
}

interface IEdgesFromRecordInternal {
    fromMap: Map<string, IEdgesToRecord>,
    _froms: List<IEdgesToRecord>
}

export interface IEdgesFromRecord extends Record<IEdgesFromRecordInternal> {
    deleteEdgesForNode(nodeId: string): IEdgesFromRecord,
    setEdge({from, to, value}: {from: string, to: string, value: number | boolean}): IEdgesFromRecord,
    addEdge(edge: IEdgeRecord): IEdgesFromRecord
}

const EdgesFromRecord = Record<IEdgesFromRecordInternal>({
    fromMap: Map(),
    _froms: List()
});

function getEdgesFromRecord() {
    return EdgesFromRecord() as unknown as IEdgesFromRecord;
}

EdgesFromRecord.prototype.deleteEdgesForNode = function(nodeId: string) {
    let res = this as IEdgesFromRecord;
    res = res.set("_froms", res.get("_froms").filter(edgesToRecord=>edgesToRecord.get("from") !== nodeId));
    res = res.set("fromMap", res.get("fromMap").filter((_, from)=>from !== nodeId));
    
    res.get("fromMap").keySeq().forEach(from=>{
        const currentEdgesToRecord = res.get("fromMap").get(from) as IEdgesToRecord;
        const newEdgesToRecord = currentEdgesToRecord.deleteEdgesForNode(nodeId);
        res = res.setIn(["fromMap", from], newEdgesToRecord);
    })

    return res;
}

EdgesFromRecord.prototype.setEdge = function({from, to, value}: {from: string, to: string, value: number | boolean}) {
    const object = this as IEdgesFromRecord;

    const prevEdgesToRecord = object.get("fromMap").get(from) as IEdgesToRecord;
    const newEdgesToRecord = prevEdgesToRecord.setEdge({to, value});

    const currentFroms = object.get("_froms") as List<IEdgesToRecord>;

    return object
        .setIn(["fromMap", from], newEdgesToRecord)
        .setIn(["_froms", currentFroms.findIndex(edgesTo=>edgesTo.get("from") === from)], newEdgesToRecord);
};

EdgesFromRecord.prototype.addEdge = function (edge: IEdgeRecord) {
    let edgesFromRecord = this as IEdgesFromRecord;

    if (!edgesFromRecord.get("fromMap").has(edge.get("from"))) {
        const edgesToRecord = getEdgesToRecord({from: edge.get("from")});

        edgesFromRecord = edgesFromRecord.setIn(["fromMap", edge.get("from")], edgesToRecord);

        const curFroms = edgesFromRecord.get("_froms");
        const newFroms = curFroms.push(edgesToRecord);

        edgesFromRecord = edgesFromRecord.set("_froms", newFroms);
    }

    const curEdgesToRecord = edgesFromRecord.get("fromMap").get(edge.get("from")) as IEdgesToRecord;
    const newEdgesToRecord = curEdgesToRecord.addEdge(edge);

    edgesFromRecord = edgesFromRecord.setIn(
        ["fromMap", edge.get("from")],
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

interface IEdgesRecordInternal {
    edgesFromRecord: IEdgesFromRecord,
    _edges: List<IEdgeRecord>
}

export interface IEdgesRecord extends Record<IEdgesRecordInternal> {
    deleteEdgesForNode(nodeId: string): IEdgesRecord,
    addEdge(edge: IEdgeRecord): IEdgesRecord,
    addEdges(...edges: IEdgeRecord[]): IEdgesRecord,
    setEdge({from, to, value}: {from: string, to: string, value: number | boolean}): IEdgesRecord
}

const EdgesRecord = Record({
    edgesFromRecord: getEdgesFromRecord(),
    _edges: List()
});

export function getEmptyEdgesRecord() {
    return EdgesRecord() as unknown as IEdgesRecord;
}

EdgesRecord.prototype.deleteEdgesForNode = function(nodeId: string) {
    let res = this as IEdgesRecord;
    res = res.set("_edges", res.get("_edges").filter(edge=>edge.get("from") !== nodeId && edge.get("to") !== nodeId));
    return res.set("edgesFromRecord", res.get("edgesFromRecord").deleteEdgesForNode(nodeId));
}

EdgesRecord.prototype.addEdge = function(edge: IEdgeRecord) {
    let edgesRecord = this;
    edgesRecord = edgesRecord.set("_edges", edgesRecord.get("_edges").push(edge));
    edgesRecord = edgesRecord.set("edgesFromRecord", edgesRecord.get("edgesFromRecord").addEdge(edge));
    return edgesRecord;
};

EdgesRecord.prototype.addEdges = function(...edges: IEdgeRecord[]) {
    let edgesRecord = this;

    edges.forEach(edge => {
        edgesRecord = edgesRecord.addEdge(edge);
    });

    return edgesRecord;
};

EdgesRecord.prototype.setEdge = function({from, to, value}: {from: string, to: string, value: number | boolean}) {
    const object = this as IEdgesRecord;

    return object
        .setIn(
            [
                "_edges",
                object.get("_edges")
                    .findIndex((edge)=>edge.get("from") === from && edge.get("to") === to),
                "value"
            ],
            value
        )
        .set("edgesFromRecord", this.get("edgesFromRecord").setEdge({from, to, value}));
}

export const getEdgesRecord = (edgesArray: List<IEdgeRecord>=List()) => {
    const edges = List(edgesArray);

    let res = getEmptyEdgesRecord().addEdges(...edges);

    return res;
};