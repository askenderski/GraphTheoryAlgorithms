import {useState, useContext} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import useEffectWithWaitForCleanup from "../../../../Hooks/useEffectWithWaitForCleanup";
import { adjacencyMatrixToGraphRepresentation } from "../../../../Utilities/graphs";

export default function StartAlgorithmButton() {
    const {nodesRecord: nodes, handlers, algorithmGetter, controller} = useContext(BasicAlgorithmContext);

    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    useEffectWithWaitForCleanup(() => {
        async function main() {
            if (algorithmController.isMock) return;

            const algorithm = algorithmGetter(algorithmController);
            algorithm.algorithm(
                nodes.nodes,
                adjacencyMatrixToGraphRepresentation(nodes.adjacencyMatrix, algorithm.graphRepresentation)
            );
        }
        
        main();

        return async () => {
            console.log(1)
            await algorithmController.invalidate();
            console.log(2)
            handlers.resetNodes();
            console.log(3)
        };
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