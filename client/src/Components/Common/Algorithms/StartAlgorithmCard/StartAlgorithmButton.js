import {useState, useEffect, useContext} from "react";
import NodeContext from "../../../../Contexts/Node";
import { adjacencyMatrixToGraphRepresentation } from "../../../../Utilities/graphs";

export default function StartAlgorithmButton({algorithmTitle, algorithmType}) {
    const {nodesRecord: nodes, handlers} = useContext(NodeContext);

    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    const algorithmGetterPromise = import(`../../../../Algorithms/${algorithmType}/${algorithmTitle}/${algorithmTitle}`)
        .then(module=>module.default)
        .catch(err=>{
            return null;
        });

    const controllerPromise = import(`../../../../Algorithms/${algorithmType}/${algorithmTitle}/Controller`)
        .then(module=>module.default)
        .catch(err=>{
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
            setResult: () => {},
            setIsDone: () => setIsAlgorithmRunning(false),
            setNodeStyle: (nodeIndex, style) => {
                const newNodesRecord=nodes.setNodeByIndex(nodeIndex, {style});
                handlers.setNodesRecord(oldNodesRecord => {
                    const oldNodes = oldNodesRecord.get("nodes");
                    const newNodes = oldNodes.set(nodeIndex, newNodesRecord.get("nodes").get(nodeIndex));
                    return oldNodesRecord.set("nodes", newNodes);
                });
            }
        }));
    }

    return <button onClick={startAlgorithm}>Start</button>;
}