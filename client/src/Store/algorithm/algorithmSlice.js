import { createSelector, createSlice } from "@reduxjs/toolkit";
import { NodesRecord } from "../../Records/NodesRecord/NodesRecord";
import { mergeIn, setIn } from "../Utilities/reducerFunctions";
import { defaultNodeStyle } from "../../Data/Algorithms/graph";

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    variables: {},
    pointerLine: -1,
    currentController: {},
    invalidateAlgorithm: ()=>{},
    nodesRecord: NodesRecord()
  },
  reducers: {
    setVariables: (state, {payload}) => {
      return setIn(state, ["variables"], payload);
    },
    mergeVariables: (state, {payload}) => {
      return mergeIn(state, ["variables"], payload);
    },
    setVariable: (state, {payload, asyncDispatch}) => {
      asyncDispatch({type: "algorithm/mergeVariables", payload: {[payload.name]: payload.value}});

      return state;
    },
    setPointerLine: (state, {payload}) => {
      return setIn(state, ["pointerLine"], payload);
    },
    setCurrentController: (state, {payload}) => {
      return setIn(state, ["currentController"], payload);
    },
    setInvalidateAlgorithm: (state, {payload}) => {
      return setIn(state, ["invalidateAlgorithm"], payload);
    },
    setNodesRecord: (state, {payload})=>{
      console.log("setting nodes record")
      return setIn(state, ["nodesRecord"], payload);
    },
    resetNodesStyle: (state) => {
      const newNodes = state.nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
      const newNodesRecord = state.nodesRecord.set("nodes", newNodes);
      return setIn(state, ["nodesRecord"], newNodesRecord);
    },
    setNodeStyle: (state, {payload, asyncDispatch}) => {
      const {nodeId, style} = payload;
      console.log(nodeId, style)
      const nodesRecord = state.nodesRecord;

      const nodeIndex = nodesRecord.get("nodes").findIndex(node=>node.id===nodeId);
      const newRecord = nodesRecord.setIn(["nodes", nodeIndex, "style"], style);

      asyncDispatch({type: "algorithm/setNodesRecord", payload: newRecord});

      return state;
    }
  }
});

const selectAlgorithm = state => state.algorithm;

export const selectVariables = createSelector(selectAlgorithm, algorithm => algorithm.variables);
export const selectInvalidateAlgorithm = createSelector(selectAlgorithm, algorithm => algorithm.invalidateAlgorithm);
export const selectPointerLine = createSelector(selectAlgorithm, algorithm => algorithm.pointerLine);
export const selectCurrentController = createSelector(selectAlgorithm, algorithm => algorithm.currentController);
export const selectNodesRecord = createSelector(selectAlgorithm, algorithm => algorithm.nodesRecord);

export const {
  setVariables, setPointerLine, setCurrentController, setInvalidateAlgorithm, setNodesRecord, resetNodesStyle,
  setNodeStyle, setVariable
} = algorithmSlice.actions;

export const reducer = algorithmSlice.reducer;