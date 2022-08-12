import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord";
import {getOneById} from "../../../Services/algorithmService";
import NodesCard from "./NodesCard/NodesCard";
import RndOfStartAlgorithmButton from "./RndOfStartAlgorithmButton/RndOfStartAlgorithmButton";
import {nodeMatrixToGraphRepresentation} from "../../../Utilities/graphs";
import { getHandlers } from "../../../Tests/Utilities/algorithmHandlers";

export default function AlgorithmRouting({match: {params}}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    const [nodes, setNodes] = useState(NodesRecord());
    const [doesGraphExist, setDoesGraphExist] = useState(true);
    const [doesAlgorithmExist, setDoesAlgorithmExist] = useState(true);
    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    const algorithmGetterPromise = import(`../../../Algorithms/${algorithmType}/${algorithmTitle}/${algorithmTitle}`)
        .catch(err=>{
            setDoesAlgorithmExist(false);
            return null;
        });

    const controllerPromise = import(`../../../Algorithms/${algorithmType}/${algorithmTitle}/Controller`)
        .catch(err=>{
            setDoesAlgorithmExist(false);
            return null;
        });

    const [algorithmController, setAlgorithmController] = useState();

    useEffect(async () => {
        if (algorithmController === undefined) return;

        algorithmGetterPromise
            .then(({default: algorithmGetter})=>algorithmGetter(algorithmController))
            .then(({algorithm, graphRepresentation})=>
                algorithm(nodeMatrixToGraphRepresentation(nodes.nodeMatrix, graphRepresentation))
            );

        return () => algorithmController.invalidate();
    }, [algorithmController]);

    async function startAlgorithm() {
        setIsAlgorithmRunning(true);

        const controller = (await controllerPromise);

        setAlgorithmController(controller.default({
            setOutputValue: () => {},
            setIsDone: () => setIsAlgorithmRunning(false),
            setNodeStyle: (node, style) => {
                console.log(node)
                console.log(style)
            }
        }));
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

    const nodesCardHandlers = getHandlers(nodes, setNodes);

    if (doesGraphExist && doesAlgorithmExist) {
        return (
            <>
                <NodesCard nodes={nodes} handlers={nodesCardHandlers}/>
                <RndOfStartAlgorithmButton startAlgorithm={startAlgorithm}/>
            </>
        );
    }

    return null;
};