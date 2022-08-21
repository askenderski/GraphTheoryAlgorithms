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
        setIsAlgorithmRunning(true);

        setAlgorithmController(controller({
            setResult: () => {},
            setIsDone: () => setIsAlgorithmRunning(false),
            setNodeStyle: (nodeId, style) => {
                handlers.setNodeStyle(nodeId, style);
            }
        }));

        setIsAlgorithmPaused(false);
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
        setIsAlgorithmPaused(false);
        setIsAlgorithmRunning(false);
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