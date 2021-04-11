import {List} from "immutable";

export const nodeMatrixToGraphRepresentation = function (nodeMatrix, graphRepresentation) {
    switch (graphRepresentation) {
        case "adjacencyMatrix":
            return nodeMatrix;
        case "edgeList":
            const emptyEdgeList = List.of();

            new Array(nodeMatrix.size)
                .reduce((curEdgeList1, curRow, cellTo) => {
                    return curRow.reduce((curEdgeList2, curCell, cellFrom) => {
                        if (curCell === 0 || curCell === false) {
                            return curEdgeList2;
                        }

                        return curEdgeList2.setIn(cellFrom, curEdgeList2.get(cellFrom).push({to: cellTo, val: curCell}));
                    }, curEdgeList1);
                }, emptyEdgeList);
        default:
            return;
    }
};