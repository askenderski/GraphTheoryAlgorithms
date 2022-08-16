import {List} from "immutable";

export const adjacencyMatrixToGraphRepresentation = function (adjacencyMatrix, graphRepresentation) {
    switch (graphRepresentation) {
        case "adjacencyMatrix":
            return adjacencyMatrix;
        case "adjacencyList":
            const emptyEdgeList = List.of(...new Array(adjacencyMatrix.size).fill(1).map(()=>List()));

            return adjacencyMatrix
                .reduce((curEdgeList1, curRow, cellTo) => {
                    return curRow.reduce((curEdgeList2, curEdge, cellFrom) => {
                        if (curEdge === 0 || curEdge === false) {
                            return curEdgeList2;
                        }

                        return curEdgeList2.set(cellFrom, curEdgeList2.get(cellFrom).push(curEdge));
                    }, curEdgeList1);
                }, emptyEdgeList);
        case "edgeList":
            let edgeList = List();

            for (let i = 0; i < adjacencyMatrix.size; i++) {
                const listOfNodesFromToNodeTo = adjacencyMatrix.get(i);

                for (let j = 0; j < listOfNodesFromToNodeTo.size; j++) {
                    if (listOfNodesFromToNodeTo.get(j).get("value"))
                        edgeList = edgeList.push(listOfNodesFromToNodeTo.get(j));
                }
            }

            return edgeList;
        default:
            return;
    }
};