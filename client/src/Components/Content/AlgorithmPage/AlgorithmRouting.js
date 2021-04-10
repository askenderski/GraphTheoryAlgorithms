import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord";
import {getOneById} from "../../../Services/algorithmService";
import {Rnd} from "react-rnd";
import NodesCard from "./NodesCard/NodesCard";
import {List} from "immutable";

export default function AlgorithmRouting({match: {params}}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    const [nodes, setNodes] = useState(NodesRecord());
    const [doesGraphExist, setDoesGraphExist] = useState(true);
    const [nodesCardSize, setNodesCardSize] = useState({width: 200, height: 150});
    const [nodesCardPosition, setNodesCardPosition] = useState({x: 100, y: 100});

    const [isScrolling, setIsScrolling] = useState(false);

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
        console.log(undirectedNodeMatrix)

        return undirectedNodeMatrix
            .reduce((curMatrix, row, rowIndex) => {
                console.log(curMatrix)

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

    useEffect(() => {
        getOneById(graphId)
            .then(graph=>{
                setNodes(NodesRecordFromGraphObject(graph));
            })
            .catch(err=>{
                setDoesGraphExist(false);
            });
    }, [graphId]);

    if (doesGraphExist) {
        return (
            <Rnd
                size={{ width: nodesCardSize.width,  height: nodesCardSize.height }}
                position={{ x: nodesCardPosition.x, y: nodesCardPosition.y }}
                onDragStop={(e, d) => {
                    if (isScrolling) {
                        setIsScrolling(false);
                        return;
                    }

                    setNodesCardPosition({ x: d.x, y: d.y });
                }}
                // onResizeStop={
                //     (e, direction, ref, delta, position) => {
                //         setNodesCardSize({
                //             width: ref.style.width,
                //             hei/>ght: ref.style.height,
                //             ...position,
                //         });
                //     }
                // }
                onResize={
                    (e, direction, ref, delta, position) => {
                        setNodesCardSize({
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }
                }
            >
                <NodesCard
                    size={nodesCardSize}
                    nodes={nodes}
                    handlers={{
                        addNode, setNode, deleteNode, toggleIsDirected,
                        toggleIsWeighted, onScrollCapture: () => {
                            setIsScrolling(true);
                        }
                    }}
                />
            </Rnd>
        );
    }

    return null;
};