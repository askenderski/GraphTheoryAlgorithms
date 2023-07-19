import { EdgesRepresentationType, IEdgeList } from "Algorithms/IAlgorithm";
import { IEdgeRecord } from "Records/EdgeRecord/EdgeRecord";
import { IEdgesRecord } from "Records/EdgesRecord/EdgesRecord";
import {List} from "immutable";

export const adjacencyMatrixToGraphRepresentation =
    function (adjacencyMatrix: List<List<IEdgeRecord>>, graphRepresentation: string) {
        switch (graphRepresentation) {
            case "adjacencyMatrix":
                return adjacencyMatrix;
            case "adjacencyList":
                const emptyEdgeList = List.of(...new Array(adjacencyMatrix.size).fill(1).map(()=>List()));

                return adjacencyMatrix
                    .reduce((curEdgeList1, curRow, cellTo) => {
                        return curRow.reduce((curEdgeList2, curEdge, cellFrom) => {
                            if (curEdge.get("value") === 0 || curEdge.get("value") === false) {
                                return curEdgeList2;
                            }

                            const edgeListFrom = curEdgeList2.get(cellFrom) as List<IEdgeRecord>;

                            return curEdgeList2.set(cellFrom, edgeListFrom.push(curEdge));
                        }, curEdgeList1);
                    }, emptyEdgeList);
            case "edgeList":
                let edgeList = List();

                for (let i = 0; i < adjacencyMatrix.size; i++) {
                    const listOfNodesFromToNodeTo = adjacencyMatrix.get(i) as List<IEdgeRecord>;

                    for (let j = 0; j < listOfNodesFromToNodeTo.size; j++) {
                        const nodeTo = listOfNodesFromToNodeTo.get(j) as IEdgeRecord;

                        if (nodeTo.get("value") !== 0 && nodeTo.get("value") !== false)
                            edgeList = edgeList.push(listOfNodesFromToNodeTo.get(j));
                    }
                }

                return edgeList;
            default:
                return;
        }
    };

export function edgesRecordToGraphRepresentation
    (edgesRecord: IEdgesRecord, graphRepresentation: string): EdgesRepresentationType {
        switch (graphRepresentation) {
            case "adjacencyList": {
                let res = edgesRecord
                    .get("edgesFromRecord")
                    .get("fromMap")
                    .map(edgesFromRecord =>
                            edgesFromRecord.get("toMap").valueSeq()
                                .filter(edge=>edge.get("value") !== false && edge.get("value") !== 0).toList()
                    );
                return res;
            }
            case "edgeList": {
                let res = edgesRecord
                    .get("edgesFromRecord")
                    .get("fromMap")
                    .valueSeq()
                    .map(edgesFromRecord=>edgesFromRecord.get("toMap"))
                    .flatten(1)
                    .filter(edge=>edge.value !== false && edge.value !== 0);
                return res as IEdgeList;
            }
        }

        throw new Error("Invalid graph respresentation");
    };