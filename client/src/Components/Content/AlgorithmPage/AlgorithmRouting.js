import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord";
import {getOneById} from "../../../Services/algorithmService";
import {Rnd} from "react-rnd";
import NodesCard from "./NodesCard/NodesCard";
import {getHandlers} from "../../../Tests/Utilities/algorithmHandlers";

export default function AlgorithmRouting({match: {params}}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    const [nodes, setNodes] = useState(NodesRecord());
    const [doesGraphExist, setDoesGraphExist] = useState(true);
    const [nodesCardSize, setNodesCardSize] = useState({width: 200, height: 150});
    const [nodesCardPosition, setNodesCardPosition] = useState({x: 100, y: 100});
    const [startButtonSize, setStartButtonSize] = useState({width: 50, height: 50});
    const [startButtonPosition, setStartButtonPosition] = useState({x: 50, y: 50});

    const [startAlgorithm] = useState();

    const [isScrolling, setIsScrolling] = useState(false);

    const handlers = getHandlers(nodes, setNodes);
    const {addNode, setNode, deleteNode, toggleIsDirected, toggleIsWeighted} = handlers;

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
            <>
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
                <Rnd
                    size={{ width: startButtonSize.width,  height: startButtonSize.height }}
                    position={{ x: startButtonPosition.x, y: startButtonPosition.y }}
                    onDragStop={(e, d) => {
                        setStartButtonPosition({ x: d.x, y: d.y });
                    }}
                    onResize={
                        (e, direction, ref, delta, position) => {
                            setStartButtonSize({
                                width: ref.style.width,
                                height: ref.style.height,
                                ...position,
                            });
                        }
                    }
                >
                    <button onClick={startAlgorithm}>Start</button>
                </Rnd>
            </>
        );
    }

    return null;
};