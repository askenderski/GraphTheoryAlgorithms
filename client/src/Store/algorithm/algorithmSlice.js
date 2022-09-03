import { createSelector, createSlice } from "@reduxjs/toolkit";
import { mergeIn, setIn } from "../Utilities/reducerFunctions";
import { functionStore } from "../Middlewares/functionHandler";

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    variables: {}
  },
  reducers: {
    setVariables: (state, {payload}) => {
      const newObj = mergeIn(state, ["variables"], payload);
      return newObj;
    }
  }
});

const selectAlgorithm = state => state.algorithm;

export const selectVariables = createSelector(selectAlgorithm, algorithm => algorithm.variables);
export const selectInvalidateAlgorithm = ()=>functionStore.invalidateAlgorithm();

export const {setVariables} = algorithmSlice.actions;
export const setInvalidateAlgorithm = payload => ({type: "algorithm/setInvalidateAlgorithm", payload});

export const reducer = algorithmSlice.reducer;