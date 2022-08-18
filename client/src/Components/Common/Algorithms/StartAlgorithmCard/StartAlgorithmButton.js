import {useState, useEffect, useContext} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import { adjacencyMatrixToGraphRepresentation } from "../../../../Utilities/graphs";

export default function StartAlgorithmButton({algorithmTitle, algorithmType}) {
    const {nodesRecord: nodes, handlers, algorithmGetter, controller} = useContext(BasicAlgorithmContext);

    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    const [algorithmController, setAlgorithmController] = useState();

    useEffect(() => {
        async function main() {
            if (algorithmController === undefined) return;

            const algorithm = algorithmGetter(algorithmController);
            algorithm.algorithm(
                nodes.nodes,
                adjacencyMatrixToGraphRepresentation(nodes.adjacencyMatrix, algorithm.graphRepresentation)
            );

            return () => algorithmController.invalidate();
        }
        
        main();
    }, [algorithmController]);

    async function startAlgorithm() {
        setIsAlgorithmRunning(true);

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