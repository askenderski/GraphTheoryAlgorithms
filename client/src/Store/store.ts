import { combineReducers, Store } from "redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { AlgorithmReducer, initialState as initalAlgorithmState } from "./algorithm/reducer";
import { AlgorithmActionTypesMap, IAlgorithmState } from "./algorithm/types";

const rootReducer = combineReducers({ algorithm: AlgorithmReducer });

export interface IStoreState {
  algorithm: IAlgorithmState;
}

const initialState: IStoreState = {
  algorithm: initalAlgorithmState
};

const store:Store<IStoreState> = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  })
});

const {dispatch} = store;

export const algorithmActions: {[key in keyof typeof AlgorithmActionTypesMap]: Function} = Object.entries(AlgorithmActionTypesMap)
  .map(([actionName, actionType])=>[actionName, (payload: any)=>({type: actionType, payload})])
  .reduce((acc, [actionName, action])=>({...acc, [actionName as string]: action}), {}) as {[key in keyof typeof AlgorithmActionTypesMap]: Function};

export default store;