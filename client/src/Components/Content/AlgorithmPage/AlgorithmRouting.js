import {useEffect, useState} from "react";
import {NodesRecord, NodesRecordFromGraphObject} from "../../../Records/NodesRecord/NodesRecord";
import {getOneById} from "../../../Services/algorithmService";
import NodesCard from "./NodesCard/NodesCard";
import StartAlgorithmButton from "./StartAlgorithmButton/StartAlgorithmButton";
import {adjacencyMatrixToGraphRepresentation} from "../../../Utilities/graphs";
import { getHandlers } from "../../../Utilities/algorithmHandlers";
import GraphCard from "./GraphCard/GraphCard";

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

    useEffect(() => {
        async function main() {
            if (algorithmController === undefined) return;

            algorithmGetterPromise
                .then(({default: algorithmGetter})=>algorithmGetter(algorithmController))
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

        setAlgorithmController(controller.default({
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

    useEffect(() => {
        getOneById(graphId)
            .then(graph=>{
                setNodes(NodesRecordFromGraphObject(graph));
            })
            .catch(err=>{
                console.log(err)
                setDoesGraphExist(false);
            });
    }, [graphId]);

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