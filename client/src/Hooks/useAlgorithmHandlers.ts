import { useDispatch, useSelector } from "react-redux";
import { algorithmActions } from "../Store/store";
import { useReset } from "./useReset";
import { useSpecificAlgorithmHandlers } from "./useSpecificAlgorithmHandlers";
import { selectGetController, selectAlgorithmObject } from "Store/algorithm/reducer";
import { IAlgorithmHandlers } from "./IHandlers";
import { Controller } from "Algorithms/GenericController/IController";

const {
    setPointerLine: setPointerLineAction, setVariables: setVariablesAction,
    setCurrentController: setCurrentControllerAction, setInvalidateAlgorithm: setInvalidateAlgorithmAction,
    addConsideration: addConsiderationAction
} = algorithmActions;

export default function useAlgorithmHandlers(): IAlgorithmHandlers {
    const dispatch = useDispatch();
    
    const setPointerLine = (pointerLine: any) => dispatch(setPointerLineAction(pointerLine));
    
    const setVariables = (variables: any) => dispatch(setVariablesAction(variables));
    
    const setCurrentController = (controller: Controller) => dispatch(setCurrentControllerAction(controller));

    const addConsideration = (consideration: any) => dispatch(addConsiderationAction(consideration));

    const specificAlgorithmHandlers = useSpecificAlgorithmHandlers();

    const reset = useReset();

    const algorithm = useSelector(selectAlgorithmObject);

    const getController = useSelector(selectGetController)

    const setInvalidateAlgorithm = (invalidate: any) => {
        dispatch(setInvalidateAlgorithmAction(invalidate));
    };

    return {...specificAlgorithmHandlers, algorithm, getController, setVariables, setPointerLine,
        setCurrentController, reset, setInvalidateAlgorithm, addConsideration};
}