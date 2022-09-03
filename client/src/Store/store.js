import { configureStore } from '@reduxjs/toolkit'
import {reducer as algorithmReducer} from "./algorithm/algorithmSlice";

const store = configureStore({
  reducer: {
    algorithm: algorithmReducer
  }
});

export default store;