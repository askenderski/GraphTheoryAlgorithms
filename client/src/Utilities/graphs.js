import {List} from "immutable";

export const nodeMatrixToGraphRepresentation = function (nodeMatrix, graphRepresentation) {
    switch (graphRepresentation) {
        case "adjacencyMatrix":
            return nodeMatrix;
        case "adjacencyList":
            const emptyEdgeList = List.of(...new Array(nodeMatrix.size).fill().map(()=>List.of()));

            console.log(nodeMatrix)
            console.log(graphRepresentation)
            // console.log(nodeMatrix
            //     .reduce((curEdgeList1, curRow, cellTo) => {
            //         return curRow.reduce((curEdgeList2, curCell, cellFrom) => {
            //             console.log(curEdgeList2)
            //             console.log(curCell)
            //             console.log(cellFrom)
            //             console.log(curEdgeList2.get(cellFrom))
            //             if (curCell === 0 || curCell === false) {
            //                 return curEdgeList2;
            //             }
            //
            //             return curEdgeList2.set(cellFrom, curEdgeList2.get(cellFrom).push({to: cellTo, val: curCell}));
            //         }, curEdgeList1);
            //     }, emptyEdgeList))

            return nodeMatrix
                .reduce((curEdgeList1, curRow, cellTo) => {
                    return curRow.reduce((curEdgeList2, curCell, cellFrom) => {
                        if (curCell === 0 || curCell === false) {
                            return curEdgeList2;
                        }

                        return curEdgeList2.set(cellFrom, curEdgeList2.get(cellFrom).push({to: cellTo, val: curCell}));
                    }, curEdgeList1);
                }, emptyEdgeList);
        case "edgeList":
            const edgeList = [];

            for (let i = 0; i < nodeMatrix.size; i++) {
                const listOfNodesFromToNodeTo = nodeMatrix.get(i);

                for (let j = 0; j < listOfNodesFromToNodeTo.size; j++) {
                    if (listOfNodesFromToNodeTo.get(j)) edgeList.push({from: j, to: i});
                }
            }

            return edgeList;
        default:
            console.log("fucker")
            return;
    }
};