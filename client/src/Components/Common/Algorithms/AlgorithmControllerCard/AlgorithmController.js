import {useState, useContext, useEffect} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import useEffectWithWaitForCleanup from "../../../../Hooks/useEffectWithWaitForCleanup";

export default function StartAlgorithmButton() {
    const {handlers, setInvalidateAlgorithm, algorithm, getController} = useContext(BasicAlgorithmContext);

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    async function invalidateAlgorithm(algorithmController) {
        setIsPaused(false);
        setIsRunning(false);
        await algorithmController.invalidate();
        handlers.resetNodes();
    }

    useEffect(()=>{
        const allVariables = {};

        const oneTimeController = getController({
            setIsDone: () => {
                handlers.setVariables(allVariables)
            },
            waitTimes: {
                graphTime: 0,
                pointerTime: 0,
            },
            styleSetters: {
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

            setIsRunning(true);
            setIsPaused(false);

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
            setIsDone: () => setIsRunning(false),
            styleSetters: {
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
        if (isPaused) {
            algorithmController.unpause();
        } else {
            algorithmController.pause();
        }

        setIsPaused(!isPaused);
    }

    async function stopAlgorithm() {
        await invalidateAlgorithm(algorithmController);
    }

    return (
        <>
            <button onClick={startAlgorithm}>{isRunning ? "Restart" : "Start"}</button>
            <button onClick={toggleAlgorithmPause} disabled={!isRunning}>
                {isPaused ? "Unpause" : "Pause"}
            </button>
            <button onClick={stopAlgorithm} disabled={!isRunning}>Stop</button>
        </>
    );
}