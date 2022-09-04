import { configureStore } from '@reduxjs/toolkit'
import {reducer as algorithmReducer} from "./algorithm/algorithmSlice";
import asyncDispatchMiddleware from './Middlewares/asyncDispatch';

const store = configureStore({
  reducer: {
    algorithm: algorithmReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncDispatchMiddleware),
});

export default store;