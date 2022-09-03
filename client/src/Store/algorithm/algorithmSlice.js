import { createSelector, createSlice } from "@reduxjs/toolkit";
import { mergeIn, setIn } from "../Utilities/reducerFunctions";

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    variables: {},
    pointerLine: -1,
    currentController: {},
    invalidateAlgorithm: ()=>{}
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
      console.log(payload)
      return setIn(state, ["invalidateAlgorithm"], payload);
    }
  }
});

const selectAlgorithm = state => state.algorithm;

export const selectVariables = createSelector(selectAlgorithm, algorithm => algorithm.variables);
//for some reason invalidate algorithm is saved as ()=>invalidateAlgorithm, idk why or how this happened
//TODO: fix this
export const selectInvalidateAlgorithm = createSelector(selectAlgorithm, algorithm => algorithm.invalidateAlgorithm());
export const selectPointerLine = createSelector(selectAlgorithm, algorithm => algorithm.pointerLine);
export const selectCurrentController = createSelector(selectAlgorithm, algorithm => algorithm.currentController);

export const {setVariables, setPointerLine, setCurrentController, setInvalidateAlgorithm} = algorithmSlice.actions;

export const reducer = algorithmSlice.reducer;