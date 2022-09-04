import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectNodesRecord, selectVariables,
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    setNodesRecord as setNodesRecordAction, setCurrentController as setCurrentControllerAction,
    resetNodesStyle as resetNodesStyleAction, setNodeStyle as setNodeStyleAction
}
    from "../Store/algorithm/algorithmSlice";
import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";

function getAlgorithmHandlers(nodesRecord, setNodesRecord, {setPointerLine, setVariables}) {
    function getNodesIdList() {
        return nodesRecord.get("nodes").map(node=>node.id);
    }

    function getEdgesRepresentation(edgesRepresentation) {
        return edgesRecordToGraphRepresentation(nodesRecord.get("edgesRecord"), edgesRepresentation);
    }

    function setVariable(name, value) {
        setVariables({[name]: value});
    }

    return {
        setNodesRecord, getNodesIdList, getEdgesRepresentation, setPointerLine, setVariable, setVariables
    };
}

function useReset() {
    const dispatch = useDispatch();

    const variables = useSelector(selectVariables);
    const setVariables = variables => dispatch(setVariablesAction(variables));

    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));

    const resetNodesStyle = () => dispatch(resetNodesStyleAction());

    function resetPointerLine() {
        setPointerLine(-1);
    }

    function resetVariables() {
        const newVariables = Object.keys(variables)
            .reduce((acc, varName)=>({...acc, [varName]: ""}), {})

        setVariables(newVariables);
    }

    const reset = () => {
        resetNodesStyle();
        resetPointerLine();
        resetVariables();
    };

    return reset;
}

export default function useAlgorithmHandlers() {
    const dispatch = useDispatch();
    
    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));
    
    const setVariables = variables => dispatch(setVariablesAction(variables));
    
    const nodesRecord = useSelector(selectNodesRecord);
    const setNodesRecord = nodesRecord => dispatch(setNodesRecordAction(nodesRecord));
    
    const setCurrentController = controller => dispatch(setCurrentControllerAction(controller));
    
    const setNodeStyle = (nodeId, style) => dispatch(setNodeStyleAction({nodeId, style}));

    const startAlgorithmHandlers = getAlgorithmHandlers(
        nodesRecord, setNodesRecord, {setPointerLine, setVariables}
    );

    const reset = useReset();

    return {...startAlgorithmHandlers, setNodeStyle, setCurrentController, reset};
}