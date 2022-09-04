import { useDispatch, useSelector } from "react-redux";
import {
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    setCurrentController as setCurrentControllerAction,
    selectGetController, setInvalidateAlgorithm as setInvalidateAlgorithmAction,
    selectAlgorithmObject
}
    from "../Store/algorithm/algorithmSlice";
import { useReset } from "./useReset";
import { useSpecificAlgorithmHandlers } from "./useSpecificAlgorithmHandlers";

export default function useAlgorithmHandlers() {
    const dispatch = useDispatch();
    
    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));
    
    const setVariables = variables => dispatch(setVariablesAction(variables));
    
    const setCurrentController = controller => dispatch(setCurrentControllerAction(controller));

    const specificAlgorithmHandlers = useSpecificAlgorithmHandlers();

    const reset = useReset();

    const algorithm = useSelector(selectAlgorithmObject);

    const getController = useSelector(selectGetController)

    const setInvalidateAlgorithm = invalidate => dispatch(setInvalidateAlgorithmAction(invalidate));

    return {...specificAlgorithmHandlers, algorithm, getController, setVariables, setPointerLine,
        setCurrentController, reset, setInvalidateAlgorithm};
}