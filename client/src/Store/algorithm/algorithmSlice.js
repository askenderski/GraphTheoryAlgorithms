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
      return mergeIn(state, ["variables"], payload);
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
      return setIn(state, ["nodesRecord"], payload);
    },
    resetNodesStyle: (state) => {
      console.log("resetting style")
      const newNodes = state.nodesRecord.get("nodes").map(node=>node.set("style", defaultNodeStyle));
      const newNodesRecord = state.nodesRecord.set("nodes", newNodes);
      console.log(newNodesRecord)
      return setIn(state, ["nodesRecord"], newNodesRecord);
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
  setVariables, setPointerLine, setCurrentController, setInvalidateAlgorithm, setNodesRecord, resetNodesStyle
} = algorithmSlice.actions;

export const reducer = algorithmSlice.reducer;