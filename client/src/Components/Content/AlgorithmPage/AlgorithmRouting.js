import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord";
import {getOneById} from "../../../Services/algorithmService";
import RndOfNodesCard from "./RndOfNodesCard/RndOfNodesCard";
import RndOfStartAlgorithmButton from "./RndOfStartAlgorithmButton/RndOfStartAlgorithmButton";
import {nodeMatrixToGraphRepresentation} from "../../../Utilities/graphs";

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

    if (doesGraphExist && doesAlgorithmExist) {
        return (
            <>
                <RndOfNodesCard nodes={nodes} setNodes={setNodes}/>
                <RndOfStartAlgorithmButton startAlgorithm={startAlgorithm}/>
            </>
        );
    }

    return null;
};