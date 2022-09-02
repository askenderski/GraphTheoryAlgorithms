import { createSelector, createSlice } from "@reduxjs/toolkit";
import { mergeIn } from "../Utilities/reducerFunctions";

const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    variables: {}
  },
  reducers: {
    setVariables: (state, {payload}) => {
      return mergeIn(state, ["variables"], payload);
    }
  }
});

const selectAlgorithm = state => state.algorithm;

export const selectVariables = createSelector(selectAlgorithm, algorithm => algorithm.variables);

export const {setVariables} = algorithmSlice.actions;

export const reducer = algorithmSlice.reducer;