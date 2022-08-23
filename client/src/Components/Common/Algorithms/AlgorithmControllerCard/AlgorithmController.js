import {useState, useContext, useEffect} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import useEffectWithWaitForCleanup from "../../../../Hooks/useEffectWithWaitForCleanup";

export default function StartAlgorithmButton() {
    const {handlers, setInvalidateAlgorithm, algorithm, getController} = useContext(BasicAlgorithmContext);

    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
    const [isAlgorithmPaused, setIsAlgorithmPaused] = useState(false);

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    async function invalidateAlgorithm(algorithmController) {
        setIsAlgorithmPaused(false);
        setIsAlgorithmRunning(false);
        await algorithmController.invalidate();
        handlers.resetNodes();
    }

    useEffect(()=>{
        const allVariables = {};

        const oneTimeController = getController({
            setIsDone: () => {
                handlers.setVariables(allVariables)
            },
            graphTime: 0,
            pointerTime: 0,
            setters: {
                setNodeStyle: ()=>{},
                setPointerLine: ()=>{},
                setVariable: (variableName) => allVariables[variableName] = true
            },
            algorithm
        });

        oneTimeController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );
    }, []);

    useEffectWithWaitForCleanup(() => {
        async function main() {
            //this is needed as useState set functions execute function arguments
            setInvalidateAlgorithm(()=>invalidateAlgorithm.bind(undefined));
            
            if (algorithmController.isMock) return;

            setIsAlgorithmRunning(true);
            setIsAlgorithmPaused(false);

            algorithmController.run(
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
        setAlgorithmController(getController({
            setIsDone: () => setIsAlgorithmRunning(false),
            setters: {
                setNodeStyle: (nodeId, style) => {
                    handlers.setNodeStyle(nodeId, style);
                },
                setVariable: handlers.setVariable,
                setPointerLine: handlers.setPointerLine
            },
            algorithm
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