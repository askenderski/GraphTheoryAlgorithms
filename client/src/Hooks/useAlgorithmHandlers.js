import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectNodesRecord, selectVariables,
    setPointerLine as setPointerLineAction, setVariables as setVariablesAction,
    setNodesRecord as setNodesRecordAction, setCurrentController as setCurrentControllerAction,
    resetNodesStyle as resetNodesStyleAction
}
    from "../Store/algorithm/algorithmSlice";
import { edgesRecordToGraphRepresentation } from "../Utilities/graphs";

function getStartAlgorithmHandlers(nodesRecord, setNodes,
    {setPointerLine, setVariables, variables, setCurrentController, resetNodes}) {
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

    function setNodeStyle(nodeId, style) {
        setNodesRecord((oldNodesRecord => {
            const nodeIndex = oldNodesRecord.get("nodes").findIndex(node=>node.id===nodeId);
            console.log(nodeIndex, style)

            return oldNodesRecord.setIn(["nodes", nodeIndex, "style"], style);
        })(nodesRecord));
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

    const startAlgorithmHandlers = useMemo(()=>getStartAlgorithmHandlers(
        nodesRecord, setNodesRecord,
        {setPointerLine, setVariables, variables, resetNodes: resetNodesStyle, setCurrentController}
    ), []);

    return startAlgorithmHandlers;
}