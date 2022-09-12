import {useState, useEffect} from "react";
import AlgorithmController from "./AlgorithmController";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import useSettingController from "../../../../Hooks/useSettingController";
import useStartAlgorithmWithNewController from "./useStartAlgorithmWithNewController";
import useAlgorithmHandlers from "../../../../Hooks/useAlgorithmHandlers";
import { useDispatch, useSelector } from "react-redux";
import { selectAlgorithmObject, selectGetController } from "../../../../Store/algorithm/algorithmSlice";
import { setInvalidateAlgorithm as setInvalidateAlgorithmAction } from "../../../../Store/algorithm/algorithmSlice";

export default function AlgorithmControllerContainer() {
    const handlers = useAlgorithmHandlers();

    const algorithm = handlers.algorithm;
    const getController = handlers.getController;

    const setInvalidateAlgorithm = handlers.setInvalidateAlgorithm;

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
            addConsideration: handlers.addConsideration,
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
    const pushForward = algorithmController.pushForward;

    return <AlgorithmController
            algorithmHandlers={{startAlgorithm, toggleAlgorithmPause, stopAlgorithm, pushForward}}
            algorithmState={algorithmState}
            />;
}