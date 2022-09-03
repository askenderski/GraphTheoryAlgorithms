import { createSelector, createSlice } from "@reduxjs/toolkit";
import { mergeIn, setIn } from "../Utilities/reducerFunctions";
import { functionStore } from "../Middlewares/functionHandler";

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    variables: {},
    pointerLine: -1
  },
  reducers: {
    setVariables: (state, {payload}) => {
      return mergeIn(state, ["variables"], payload);
    },
    setPointerLine: (state, {payload}) => {
      console.log(payload)
      const newObj = setIn(state, ["pointerLine"], payload);
      console.log(newObj);
      return newObj;
    }
  }
});

const selectAlgorithm = state => state.algorithm;

export const selectVariables = createSelector(selectAlgorithm, algorithm => algorithm.variables);
export const selectInvalidateAlgorithm = ()=>functionStore.invalidateAlgorithm();
export const selectPointerLine = createSelector(selectAlgorithm, algorithm => algorithm.pointerLine);

export const {setVariables, setPointerLine} = algorithmSlice.actions;
export const setInvalidateAlgorithm = payload => ({type: "algorithm/setInvalidateAlgorithm", payload});

export const reducer = algorithmSlice.reducer;