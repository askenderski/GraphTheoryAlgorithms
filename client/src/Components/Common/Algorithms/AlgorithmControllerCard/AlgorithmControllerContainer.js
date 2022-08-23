import {useState, useContext, useEffect} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import AlgorithmController from "./AlgorithmController";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";

export default function AlgorithmControllerContainer() {
    const {handlers, setInvalidateAlgorithm, algorithm, getController} = useContext(BasicAlgorithmContext);

    const [algorithmState, setAlgorithmState] = useStateWithShallowMerge({isPaused: false, isRunning: false});

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    function invalidateAlgorithm() {
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

        algorithmController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );
        
        return invalidateAlgorithm;
    }, [algorithmController]);

    function startAlgorithm() {
        setAlgorithmController(getController({
            setIsDone: () => {},
            styleSetters: {
                setNodeStyle: (nodeId, style) => {
                    handlers.setNodeStyle(nodeId, style);
                },
                setVariable: handlers.setVariable,
                setPointerLine: handlers.setPointerLine
            },
            setAlgorithmState,
            algorithm
        }));
    }

    function toggleAlgorithmPause() {
        if (algorithmState.isPaused) {
            algorithmController.unpause();
        } else {
            algorithmController.pause();
        }
    }

    const stopAlgorithm = invalidateAlgorithm;

    return <AlgorithmController
            algorithmHandlers={{startAlgorithm, toggleAlgorithmPause, stopAlgorithm}}
            algorithmState={algorithmState}
            />;
}