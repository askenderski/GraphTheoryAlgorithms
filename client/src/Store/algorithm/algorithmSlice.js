import { createSelector, createSlice } from "@reduxjs/toolkit";
import { NodesRecord } from "../../Records/NodesRecord/NodesRecord";
import { mergeIn, setIn } from "../Utilities/reducerFunctions";
import { defaultNodeStyle } from "../../Data/Algorithms/graph";

const getControllerDefault = ()=>{};
getControllerDefault.isMock = true;

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    variables: {},
    pointerLine: -1,
    currentController: {},
    getController: getControllerDefault,
    algorithmText: "",
    algorithm: {},
    invalidateAlgorithm: ()=>{},
    nodesRecord: NodesRecord()
  },
  reducers: {
    setAlgorithmText: (state, {payload}) => {
      return setIn(state, ["algorithmText"], payload);
    },
    setGetController: (state, {payload})=>{
      return setIn(state, ["getController"], payload);
    },
    setAlgorithm: (state, {payload})=>{
      return setIn(state, ["algorithm"], payload);
    },
    setVariables: (state, {payload}) => {
      return setIn(state, ["variables"], payload);
    },
    mergeVariables: (state, {payload}) => {
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
    changeNodesRecord: (state, {payload, asyncDispatch}) => {
      const currentNodesRecord = selectNodesRecordFromAlgorithm(state);
      const newNodesRecord = payload(currentNodesRecord);
      const newNodesRecordAction = setNodesRecord(newNodesRecord);

      return asyncDispatch(newNodesRecordAction);
    }
  }
});

const selectAlgorithm = state => state.algorithm;

export const selectVariables = createSelector(selectAlgorithm, algorithm => algorithm.variables);
export const selectInvalidateAlgorithm = createSelector(selectAlgorithm, algorithm => algorithm.invalidateAlgorithm);
export const selectPointerLine = createSelector(selectAlgorithm, algorithm => algorithm.pointerLine);
export const selectCurrentController = createSelector(selectAlgorithm, algorithm => algorithm.currentController);
const selectNodesRecordFromAlgorithm = algorithm => algorithm.nodesRecord;
export const selectNodesRecord = createSelector(selectAlgorithm, selectNodesRecordFromAlgorithm);
export const selectAlgorithmObject = createSelector(selectAlgorithm, algorithm => algorithm.algorithm);
export const selectGetController = createSelector(selectAlgorithm, algorithm => algorithm.getController);
export const selectAlgorithmText = createSelector(selectAlgorithm, algorithm => algorithm.algorithmText);

export const {
  setVariables, setPointerLine, setCurrentController, setInvalidateAlgorithm, setNodesRecord,
  setNodeStyle, mergeVariables, setGetController, setAlgorithm, changeNodesRecord, setAlgorithmText
} = algorithmSlice.actions;

export const reducer = algorithmSlice.reducer;