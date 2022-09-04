import { useDispatch } from "react-redux";
import {
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    setCurrentController as setCurrentControllerAction
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

    return {...specificAlgorithmHandlers, setVariables, setPointerLine, setCurrentController, reset};
}