import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord";
import {getOneById} from "../../../Services/algorithmService";
import {Rnd} from "react-rnd";
import NodesCard from "./NodesCard/NodesCard";
import {getHandlers} from "../../../Tests/Utilities/algorithmHandlers";
import RndOfNodesCard from "./RndOfNodesCard/RndOfNodesCard";

export default function AlgorithmRouting({match: {params}}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    const [nodes, setNodes] = useState(NodesRecord());
    const [doesGraphExist, setDoesGraphExist] = useState(true);
    const [startButtonSize, setStartButtonSize] = useState({width: 50, height: 50});
    const [startButtonPosition, setStartButtonPosition] = useState({x: 50, y: 50});

    const [startAlgorithm] = useState();

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
                <RndOfNodesCard nodes={nodes} setNodes={setNodes} />
                <Rnd
                    size={{width: startButtonSize.width, height: startButtonSize.height}}
                    position={{x: startButtonPosition.x, y: startButtonPosition.y}}
                    onDragStop={(e, d) => {
                        setStartButtonPosition({x: d.x, y: d.y});
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