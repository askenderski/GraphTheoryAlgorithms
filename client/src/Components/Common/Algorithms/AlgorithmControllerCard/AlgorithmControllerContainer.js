import {useState, useContext, useEffect} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import AlgorithmController from "./AlgorithmController";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import useSettingController from "../../../../Hooks/useSettingController";
import useStartAlgorithmWithNewController from "./useStartAlgorithmWithNewController";

export default function AlgorithmControllerContainer() {
    const {handlers, setInvalidateAlgorithm, algorithm, getController} = useContext(BasicAlgorithmContext);
    console.log("new thing")

    const [algorithmState, setAlgorithmState] = useStateWithShallowMerge({isPaused: false, isRunning: false});

    const [algorithmController, setAlgorithmController] = useState({invalidate: ()=>{}, isMock: true});

    function invalidateAlgorithm() {
        algorithmController.invalidate();
        handlers.reset();
    }

    useSettingController({getController, handlers, algorithm});

    useStartAlgorithmWithNewController({
        setInvalidateAlgorithm, invalidateAlgorithm, algorithmController, handlers, algorithm
    });

    useEffect(()=>{
        handlers.setCurrentController(algorithmController);
    }, [algorithmController]);

    function startAlgorithm() {
        setAlgorithmController(getController({
            setIsDone: () => {},
            styleSetters: {
                setNodeStyle: handlers.setNodeStyle,
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

    const stopAlgorithm = algorithmController.invalidate;

    return <AlgorithmController
            algorithmHandlers={{startAlgorithm, toggleAlgorithmPause, stopAlgorithm}}
            algorithmState={algorithmState}
            />;
}