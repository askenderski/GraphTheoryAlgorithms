import {List, Record} from "immutable";
import AddNodesRecordPrototype from "./AddNodesRecordPrototype/AddNodesRecordPrototype";
import { getNodeRecord } from "../NodeRecord/NodeRecord";
import { IEdgeRecord, getEdgeRecord } from "../EdgeRecord/EdgeRecord";
import { getEdgesRecord } from "../EdgesRecord/EdgesRecord";
import { IEdgesRecord } from "../EdgesRecord/EdgesRecord";
import { INodeRecord } from "../NodeRecord/NodeRecord";

interface INodesRecordInternal {
    nodes: List<INodeRecord>;
    nodeCount: number;
    adjacencyMatrix: List<List<IEdgeRecord>>;
    edgesRecord: IEdgesRecord;
    isWeighted: boolean;
    isDirected: boolean;
}

interface INodesRecordInternalMethods {
    getEdge({from, to}: {from: string, to: string}): IEdgeRecord,
    addNode(node: INodeRecord): INodesRecord,
    setEdge({to, from, value}: {to: string, from: string, value: number | boolean}): INodesRecord,
    toggleIsWeighted(): INodesRecord,
    toggleIsDirected(): INodesRecord,
    deleteNodeById(nodeId: string): INodesRecord,
    getNodeById(nodeId: string): INodeRecord
}

export type INodesRecord = Record<INodesRecordInternal> & INodesRecordInternalMethods;

const NodesRecord = Record<INodesRecordInternal>({
    nodes: List<INodeRecord>([getNodeRecord()]),
    nodeCount: 1,
    adjacencyMatrix: List.of(List.of(getEdgeRecord({weighted: false, from: "", to: ""}))),
    edgesRecord: getEdgesRecord(),
    isWeighted: false,
    isDirected: false
});

AddNodesRecordPrototype(NodesRecord);

function getAdjacencyMatrixAsList(
    {adjacencyMatrix, isWeighted}: {adjacencyMatrix: (number | boolean)[][], isWeighted: boolean},
    nodesList: List<INodeRecord>
    ) {
    return List.of(...adjacencyMatrix.map((nodeRowArray, toIndex)=>List.of(
        ...nodeRowArray
            .map((value, fromIndex)=>
                getEdgeRecord({
                    value, to: (nodesList.get(toIndex) as INodeRecord).get("id"),
                    from: (nodesList.get(fromIndex) as INodeRecord).get("id"), weighted: isWeighted
                }))
        )
    ));
}

const getNodeRecordByIndex = (i: number)=>getNodeRecord({value: i, label: i.toString()});

type IGraph = {
    adjacencyMatrix: (number | boolean)[][],
    isWeighted: boolean
};

export function getNodesRecord() {
    return getNodesRecordFromGraphObject();
}

export function getNodesRecordFromGraphObject(
    graph: IGraph={adjacencyMatrix: [[false]], isWeighted: false}
    ): INodesRecord {
        const {adjacencyMatrix} = graph;
        
        const nodesArray = new Array(adjacencyMatrix.length).fill(1).map((_, i)=>getNodeRecordByIndex(i));
        const nodesList = List(nodesArray);
        
        const adjacencyMatrixAsList = getAdjacencyMatrixAsList(graph, nodesList);
        const edgesRecord = getEdgesRecord(adjacencyMatrixAsList.flatten(2) as List<IEdgeRecord>);

        const nodesRecord = NodesRecord({...graph, edgesRecord, nodes: nodesList, adjacencyMatrix: adjacencyMatrixAsList});

        return nodesRecord as unknown as INodesRecord;
    };