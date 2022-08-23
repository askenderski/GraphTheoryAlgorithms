import {useState, useContext, useEffect} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import AlgorithmController from "./AlgorithmController";

export default function AlgorithmControllerContainer() {
    const {handlers, setInvalidateAlgorithm, algorithm, getController} = useContext(BasicAlgorithmContext);

    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    function invalidateAlgorithm() {
        setIsPaused(false);
        setIsRunning(false);
        algorithmController.invalidate();
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

    useEffect(() => {
        //this is needed as useState set functions execute function arguments
        setInvalidateAlgorithm(()=>invalidateAlgorithm);
        
        if (algorithmController.isMock) return;

        setIsRunning(true);
        setIsPaused(false);

        algorithmController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );
        
        return invalidateAlgorithm;
    }, [algorithmController]);

    function startAlgorithm() {
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

    const stopAlgorithm = invalidateAlgorithm;

    return <AlgorithmController
            algorithmHandlers={{startAlgorithm, toggleAlgorithmPause, stopAlgorithm}}
            algorithmState={{isPaused, isRunning}}
            />;
}