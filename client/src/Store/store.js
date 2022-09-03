import { configureStore } from '@reduxjs/toolkit'
import {reducer as algorithmReducer} from "./algorithm/algorithmSlice";
import { functionHandler } from './Middlewares/functionHandler';

const store = configureStore({
  reducer: {
    algorithm: algorithmReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(functionHandler)
});

export default store;