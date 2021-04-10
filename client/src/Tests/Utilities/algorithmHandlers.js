import {List} from "immutable";

export function getHandlers(nodes, setNodes) {
    function addNode() {
        setNodes(nodes => {
            const defaultNode = nodes.get("isWeighted") ? 0 : false;
            const nodesWithNewCount = nodes.set("nodeCount", nodes.nodeCount + 1);

            return nodesWithNewCount.set("nodeMatrix", nodes.get("nodeMatrix")
                .reduce((curList, nodeRow) => {
                    return curList.push(nodeRow.push(defaultNode));
                }, List())
                .push(List.of(...new Array(nodesWithNewCount.nodeCount).fill(defaultNode))));
        });
    }

    function setNode({i, j}, val) {
        setNodes(nodes => {
            if (!nodes.get("isDirected")) {
                return nodes.setIn(["nodeMatrix", i, j], val).setIn(["nodeMatrix", j, i], val);
            }

            return nodes.setIn(["nodeMatrix", i, j], val);
        });
    }

    function deleteNode(i) {
        setNodes(nodes => {
            if (nodes.nodeCount <= 0) return nodes;

            const nodesWithNewCount = nodes.set("nodeCount", nodes.nodeCount - 1);

            return nodesWithNewCount.set("nodeMatrix", nodes.get("nodeMatrix")
                .reduce((curList, nodeRow) => {
                    return curList.push(nodeRow.delete(i));
                }, List())
                .delete(i));
        });
    }

    function undirectedToDirectedNodeMatrix(undirectedNodeMatrix) {
        return undirectedNodeMatrix
            .reduce((curMatrix, row, rowIndex) => {
                return row.slice(rowIndex)
                    .reduce(
                        (newFinalMatrix, curCell, cellIndex) =>
                            newFinalMatrix.setIn(
                                [cellIndex+rowIndex, rowIndex],
                                curCell
                            ),
                        curMatrix
                    );
            }, undirectedNodeMatrix);
    }

    function toggleIsDirected() {
        setNodes(nodes => {
            const wasDirected = nodes.get("isDirected");
            const nodesWithReversedDirected = nodes.set("isDirected", !wasDirected);

            if (wasDirected) {
                return nodesWithReversedDirected.set("nodeMatrix",
                    undirectedToDirectedNodeMatrix(nodes.get("nodeMatrix"))
                );
            }

            return nodesWithReversedDirected;
        });
    }

    function toggleIsWeighted() {
        setNodes(nodes => {
            const wasWeighted = nodes.get("isWeighted");
            const nodesWithReversedWeight = nodes.set("isWeighted", !wasWeighted);

            if (wasWeighted) {
                return nodesWithReversedWeight.set("nodeMatrix",
                    nodesWithReversedWeight.get("nodeMatrix")
                        .map(nodeRow=>nodeRow.map(nodeCell=>nodeCell !== 0 ? true : false)));
            } else {
                return nodesWithReversedWeight.set("nodeMatrix",
                    nodesWithReversedWeight.get("nodeMatrix")
                        .map(nodeRow=>nodeRow.map(nodeCell=>nodeCell ? 1 : 0)));
            }
        });
    }

    return {addNode, setNode, deleteNode, toggleIsDirected, toggleIsWeighted};
};