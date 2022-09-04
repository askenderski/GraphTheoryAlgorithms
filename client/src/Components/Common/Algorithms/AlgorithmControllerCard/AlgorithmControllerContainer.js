import {useState, useContext, useEffect} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import AlgorithmController from "./AlgorithmController";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import useSettingController from "../../../../Hooks/useSettingController";
import useStartAlgorithmWithNewController from "./useStartAlgorithmWithNewController";
import useAlgorithmHandlers from "../../../../Hooks/useAlgorithmHandlers";
import { useSelector } from "react-redux";
import { selectAlgorithmObject, selectGetController } from "../../../../Store/algorithm/algorithmSlice";

export default function AlgorithmControllerContainer() {
    const {setInvalidateAlgorithm} = useContext(BasicAlgorithmContext);
    const handlers = useAlgorithmHandlers();

    const algorithm = useSelector(selectAlgorithmObject);
    const getController = useSelector(selectGetController);

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