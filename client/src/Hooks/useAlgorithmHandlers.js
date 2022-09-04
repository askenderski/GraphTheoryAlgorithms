import { useDispatch } from "react-redux";
import {
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    setCurrentController as setCurrentControllerAction,
    setNodeStyle as setNodeStyleAction
}
    from "../Store/algorithm/algorithmSlice";
import { useReset } from "./useReset";
import { useSpecificAlgorithmHandlers } from "./useSpecificAlgorithmHandlers";

export default function useAlgorithmHandlers() {
    const dispatch = useDispatch();
    
    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));
    
    const setVariables = variables => dispatch(setVariablesAction(variables));
    
    const setCurrentController = controller => dispatch(setCurrentControllerAction(controller));
    
    const setNodeStyle = (nodeId, style) => dispatch(setNodeStyleAction({nodeId, style}));

    const specificAlgorithmHandlers = useSpecificAlgorithmHandlers();

    const reset = useReset();

    return {...specificAlgorithmHandlers, setVariables, setNodeStyle, setPointerLine, setCurrentController, reset};
}