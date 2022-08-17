import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord/NodesRecord";
import NodesCard from "./NodesCard/NodesCard";
import StartAlgorithmButton from "./StartAlgorithmButton/StartAlgorithmButton";
import {adjacencyMatrixToGraphRepresentation} from "../../../Utilities/graphs";
import { getHandlers } from "../../../Utilities/algorithmHandlers";
import GraphCard from "./GraphCard/GraphCard";
import useSetGraph from "./Hooks/useSetGraph";

export default function AlgorithmRouting({match: {params}}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    const [nodes, setNodes] = useState(NodesRecord());
    const [doesGraphExist, setDoesGraphExist] = useState(true);
    const [doesAlgorithmExist, setDoesAlgorithmExist] = useState(true);
    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    const algorithmGetterPromise = import(`../../../Algorithms/${algorithmType}/${algorithmTitle}/${algorithmTitle}`)
        .then(module=>module.default)
        .catch(err=>{
            setDoesAlgorithmExist(false);
            return null;
        });

    const controllerPromise = import(`../../../Algorithms/${algorithmType}/${algorithmTitle}/Controller`)
        .then(module=>module.default)
        .catch(err=>{
            setDoesAlgorithmExist(false);
            return null;
        });

    const [algorithmController, setAlgorithmController] = useState();

    useEffect(() => {
        async function main() {
            if (algorithmController === undefined) return;

            algorithmGetterPromise
                .then(algorithmGetter=>algorithmGetter(algorithmController))
                .then(({algorithm, graphRepresentation})=>
                    algorithm(nodes.nodes, adjacencyMatrixToGraphRepresentation(nodes.adjacencyMatrix, graphRepresentation))
                );

            return () => algorithmController.invalidate();
        }
        
        main();
    }, [algorithmController]);

    async function startAlgorithm() {
        setIsAlgorithmRunning(true);

        const controller = (await controllerPromise);

        setAlgorithmController(controller({
            setOutputValue: () => {},
            setIsDone: () => setIsAlgorithmRunning(false),
            setNodeStyle: (nodeIndex, style) => {
                const newNodesRecord=nodes.setNodeByIndex(nodeIndex, {style});
                setNodes(oldNodesRecord => {
                    const oldNodes = oldNodesRecord.get("nodes");
                    const newNodes = oldNodes.set(nodeIndex, newNodesRecord.get("nodes").get(nodeIndex));
                    return oldNodesRecord.set("nodes", newNodes);
                });
            }
        }));
    }

    useSetGraph(graphId, {setDoesGraphExist, setNodes});

    const nodesCardHandlers = getHandlers(nodes, setNodes);

    if (doesGraphExist && doesAlgorithmExist) {
        return (
            <>
                <NodesCard nodes={nodes} handlers={nodesCardHandlers}/>
                <StartAlgorithmButton startAlgorithm={startAlgorithm}/>
                <GraphCard nodes={nodes}/>
            </>
        );
    }

    return null;
};