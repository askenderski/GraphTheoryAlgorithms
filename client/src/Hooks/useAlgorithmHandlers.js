import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectNodesRecord, selectVariables,
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    setNodesRecord as setNodesRecordAction, setCurrentController as setCurrentControllerAction,
    resetNodesStyle as resetNodesStyleAction, setNodeStyle as setNodeStyleAction
}
    from "../Store/algorithm/algorithmSlice";
import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";

function getStartAlgorithmHandlers(nodesRecord, setNodes,
    {setPointerLine, setVariables, variables, setCurrentController, resetNodes, setNodeStyle}) {
    function resetPointerLine() {
        setPointerLine(-1);
    }

    function resetVariables() {
        const newVariables = Object.keys(variables)
            .reduce((acc, varName)=>({...acc, [varName]: ""}), {})

        setVariables(newVariables);
    }

    function reset() {
        resetNodes();
        resetPointerLine();
        resetVariables();
    }

    function setNodesRecord(newRecord) {
        setNodes(newRecord);
    }

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
        setNodesRecord, reset, setNodeStyle,
        getNodesIdList, getEdgesRepresentation, setPointerLine, setVariable, setVariables,
        setCurrentController
    };
}

export default function useAlgorithmHandlers() {
    const dispatch = useDispatch();
    const setPointerLine = pointerLine => dispatch(setPointerLineAction(pointerLine));
    const setVariables = variables => dispatch(setVariablesAction(variables));
    const variables = useSelector(selectVariables);
    const nodesRecord = useSelector(selectNodesRecord);
    const setNodesRecord = nodesRecord => dispatch(setNodesRecordAction(nodesRecord));
    const resetNodesStyle = ()=>dispatch(resetNodesStyleAction());
    const setCurrentController = controller => dispatch(setCurrentControllerAction(controller));
    const setNodeStyle = (nodeId, style) => dispatch(setNodeStyleAction({nodeId, style}));

    const startAlgorithmHandlers = useMemo(()=>getStartAlgorithmHandlers(
        nodesRecord, setNodesRecord,
        {setPointerLine, setVariables, variables, resetNodes: resetNodesStyle, setCurrentController, setNodeStyle}
    ), []);

    return startAlgorithmHandlers;
}