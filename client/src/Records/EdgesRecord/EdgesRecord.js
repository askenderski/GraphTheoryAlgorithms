import { List, Map, Record } from "immutable";

const EdgesToRecord = Record({
    _tos: List(),
    toMap: Map()
});

const getEdgesToRecord = ({nodes, tosArrayOfEdges}) => {
    const toIdsAndIndexTuples = tosArrayOfEdges.map((_,i)=>[nodes.get(i).get("id"), i]);

    let toMap = Map();
    let tos = List();

    toIdsAndIndexTuples.forEach((id, i)=>{
        const edge = tosArrayOfEdges.get(i);
        toMap = toMap.set(id, edge);
        tos = tos.push(edge);
    });

    return EdgesToRecord({_tos: tos, toMap});
};

const EdgesFromRecord = Record({
    fromMap: Map(),
    _froms: List()
});

const getEdgesFromRecord = ({adjacencyMatrixOfEdges, nodes}) => {
    const fromIdsAndIndexTuples = adjacencyMatrixOfEdges.map((_,i)=>[nodes.get(i).get("id"), i]);
    
    let fromMap = Map();
    let froms = List();
    
    fromIdsAndIndexTuples.forEach(([id, index])=>{
        const edgesToRecord = getEdgesToRecord({nodes, tosArrayOfEdges: adjacencyMatrixOfEdges.get(index)});
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

export const getEdgesRecord = (adjacencyMatrixOfEdges, nodes) => {
    const edgesFromRecord = getEdgesFromRecord({adjacencyMatrixOfEdges, nodes});
    const edges = adjacencyMatrixOfEdges.flatten(2);

    return EdgesRecord({
        _edges: edges,
        edgesFromRecord
    });
};