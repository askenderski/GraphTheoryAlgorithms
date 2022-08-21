import {useState, useContext} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import useEffectWithWaitForCleanup from "../../../../Hooks/useEffectWithWaitForCleanup";
import { adjacencyMatrixToGraphRepresentation } from "../../../../Utilities/graphs";

export default function StartAlgorithmButton() {
    const {nodesRecord, handlers,
        setInvalidateAlgorithm, algorithmGetter, controller} = useContext(BasicAlgorithmContext);

    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    async function invalidateAlgorithm(algorithmController) {
        await algorithmController.invalidate();
        handlers.resetNodes();
    }

    useEffectWithWaitForCleanup(() => {
        async function main() {
            //this is needed as useState set functions execute function arguments
            setInvalidateAlgorithm(()=>invalidateAlgorithm.bind(undefined, algorithmController));
            
            if (algorithmController.isMock) return;

            const algorithm = algorithmGetter(algorithmController);
            algorithm.algorithm(
                handlers.getNodesList(),
                handlers.getEdgesRepresentation(algorithm.graphRepresentation)
            );
        }
        
        main();

        return async () => {
            await invalidateAlgorithm(algorithmController);
        };
    }, [algorithmController]);

    async function startAlgorithm() {
        setIsAlgorithmRunning(true);

        setAlgorithmController(controller({
            setResult: () => {},
            setIsDone: () => setIsAlgorithmRunning(false),
            setNodeStyle: (nodeIndex, style) => {
                handlers.setNodeStyleByIndex(nodeIndex, style);
            }
        }));
    }

    return <button onClick={startAlgorithm}>Start</button>;
}