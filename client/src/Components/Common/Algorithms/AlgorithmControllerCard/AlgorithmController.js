import {useState, useContext} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import useEffectWithWaitForCleanup from "../../../../Hooks/useEffectWithWaitForCleanup";
import useToggle from "../../../../Hooks/useToggle";

export default function StartAlgorithmButton() {
    const {handlers, setInvalidateAlgorithm, algorithmGetter, controller} = useContext(BasicAlgorithmContext);

    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
    const [isAlgorithmPaused, setIsAlgorithmPaused] = useState(false);

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    async function invalidateAlgorithm(algorithmController) {
        setIsAlgorithmPaused(false);
        setIsAlgorithmRunning(false);
        await algorithmController.invalidate();
        handlers.resetNodes();
    }

    useEffectWithWaitForCleanup(() => {
        async function main() {
            //this is needed as useState set functions execute function arguments
            setIsAlgorithmRunning(true);
            setIsAlgorithmPaused(false);

            setInvalidateAlgorithm(()=>invalidateAlgorithm.bind(undefined, algorithmController));
            
            if (algorithmController.isMock) return;

            const algorithm = algorithmGetter(algorithmController);
            algorithm.algorithm(
                handlers.getNodesIdList(),
                handlers.getEdgesRepresentation(algorithm.graphRepresentation)
            );
        }
        
        main();

        return async () => {
            await invalidateAlgorithm(algorithmController);
        };
    }, [algorithmController]);

    async function startAlgorithm() {
        setAlgorithmController(controller({
            setResult: () => {},
            setIsDone: () => setIsAlgorithmRunning(false),
            setNodeStyle: (nodeId, style) => {
                handlers.setNodeStyle(nodeId, style);
            }
        }));
    }

    function toggleAlgorithmPause() {
        if (isAlgorithmPaused) {
            algorithmController.unpause();
        } else {
            algorithmController.pause();
        }

        setIsAlgorithmPaused(!isAlgorithmPaused);
    }

    async function stopAlgorithm() {
        await invalidateAlgorithm(algorithmController);
    }

    return (
        <>
            <button onClick={startAlgorithm}>{isAlgorithmRunning ? "Restart" : "Start"}</button>
            <button onClick={toggleAlgorithmPause} disabled={!isAlgorithmRunning}>
                {isAlgorithmPaused ? "Unpause" : "Pause"}
            </button>
            <button onClick={stopAlgorithm} disabled={!isAlgorithmRunning}>Stop</button>
        </>
    );
}