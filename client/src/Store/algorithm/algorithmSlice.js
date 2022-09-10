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
    nodesRecord: NodesRecord(),
    considerations: []
  },
  reducers: {
    addConsideration: (state, {payload, asyncDispatch}) => {
      const currentConsiderations = selectConsiderationsFromAlgorithm(state);
      const newConsiderations = [...currentConsiderations, payload];

      return getNewConsiderations(state, newConsiderations);
    },
    setConsiderations: (state, {payload}) => {
      return getNewConsiderations(state, payload);
    },
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
      return getNewNodesRecord(state, payload);
    },
    changeNodesRecord: (state, {payload}) => {
      const currentNodesRecord = selectNodesRecordFromAlgorithm(state);
      const newNodesRecord = payload(currentNodesRecord);

      return getNewNodesRecord(state, newNodesRecord);
    }
  }
});

const getNewNodesRecord = (state, val) => setIn(state, ["nodesRecord"], val);
const getNewConsiderations = (state, val) => setIn(state, ["considerations"], val);

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
const selectConsiderationsFromAlgorithm = algorithm => algorithm.considerations;
export const selectConsiderations = createSelector(selectAlgorithm, selectConsiderationsFromAlgorithm);

export const {
  setVariables, setPointerLine, setCurrentController, setInvalidateAlgorithm, setNodesRecord,
  setNodeStyle, mergeVariables, setGetController, setAlgorithm, changeNodesRecord, setAlgorithmText,
  setConsiderations, addConsideration
} = algorithmSlice.actions;

export const reducer = algorithmSlice.reducer;