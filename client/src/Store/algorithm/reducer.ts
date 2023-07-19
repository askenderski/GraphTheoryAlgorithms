import { Reducer } from "redux";
import { AlgorithmActionTypesMap, IAlgorithmState } from "./types";
import { getNodesRecord } from "Records/NodesRecord/NodesRecord";
import { mergeIn, setIn } from "Store/Utilities/reducerFunctions";
import { createSelector } from "@reduxjs/toolkit";
import { EdgesRepresentationType, IAlgorithm } from "Algorithms/IAlgorithm";
import { IConsiderator } from "Algorithms/GenericController/IGetConsiderator";
import { List } from "immutable";
import { ISetIsDone } from "Components/Common/Algorithms/AlgorithmControllerCard/IAlgorithmControllerContainer";
import { StyleSetters } from "Algorithms/GenericController/IController";
import { IStoreState } from "Store/store";
const defaultRun = (nodesIds: List<string>, edgeList: EdgesRepresentationType)=>{};

const defaultController = {
    pause: ()=>{},
    unpause: ()=>{},
    invalidate: ()=>{},
    pushForward: ()=>{},
    goTo: (arg0: string)=>{},
    run: defaultRun
};

const getControllerDefault = (prop: {
    setIsDone: ISetIsDone,
    styleSetters: StyleSetters,
    addConsideration: (...props: any)=>void,
    setAlgorithmState: (state: {})=>void,
    algorithm: IAlgorithm<EdgesRepresentationType>,
    waitTimes?: {[key in "graph" | "pointerLine" | "variable"]: number}
}) => defaultController;
getControllerDefault.isMock = true;

export const initialState: IAlgorithmState = {
    variables: {},
    pointerLine: -1,
    currentController: defaultController,
    getController: getControllerDefault,
    algorithmText: "",
    algorithm: {
        graphRepresentation: "",
        getRun: function(arg0: {considers: IConsiderator, setIsDone: (arg0: boolean)=>void}) {
            return defaultRun;
        }
    },
    invalidateAlgorithm: ()=>{},
    nodesRecord: getNodesRecord(),
    considerations: []
};

const reducer: Reducer<IAlgorithmState> = (state = initialState, action) => {
    const {payload} = action;

    switch (action.type) {
        case AlgorithmActionTypesMap.addConsideration: {
            const currentConsiderations = selectConsiderationsFromAlgorithm(state);
            const newConsiderations = [...currentConsiderations, payload];
    
            return setIn(state, ["considerations"], newConsiderations);
        }
        case AlgorithmActionTypesMap.setConsiderations: {            
            return setIn(state, ["considerations"], payload);
        }
        case AlgorithmActionTypesMap.changeNodesRecord: {
            const currentNodesRecord = selectNodesRecordFromAlgorithm(state);
            const newNodesRecord = payload(currentNodesRecord);
    
            return setIn(state, ["nodesRecord"], newNodesRecord);
        }
        case AlgorithmActionTypesMap.setNodesRecord: {
            return setIn(state, ["nodesRecord"], payload);
        }
        case AlgorithmActionTypesMap.mergeVariables: {
            return mergeIn(state, ["variables"], payload);
        }
        case AlgorithmActionTypesMap.setVariables: {
            return setIn(state, ["variables"], payload);
        }
        case AlgorithmActionTypesMap.setAlgorithm: {
            return setIn(state, ["algorithm"], payload);
        }
        case AlgorithmActionTypesMap.setAlgorithmText: {
            return setIn(state, ["algorithmText"], payload);
        }
        case AlgorithmActionTypesMap.setCurrentController: {
            return setIn(state, ["currentController"], payload);
        }
        case AlgorithmActionTypesMap.setGetController: {
            return setIn(state, ["getController"], payload);
        }
        case AlgorithmActionTypesMap.setInvalidateAlgorithm: {
            return setIn(state, ["invalidateAlgorithm"], payload);
        }
        case AlgorithmActionTypesMap.setPointerLine: {
            return setIn(state, ["pointerLine"], payload);
        }
        default: {
        return state;
        }
    }
};

const selectAlgorithm = (state: IStoreState) => state.algorithm;

const selectNodesRecordFromAlgorithm = (algorithm: IAlgorithmState) => {
    return algorithm.nodesRecord
};
const selectConsiderationsFromAlgorithm = (algorithm: IAlgorithmState) => algorithm.considerations;

export const selectVariables = createSelector(selectAlgorithm, (algorithm) => algorithm.variables);
export const selectInvalidateAlgorithm = createSelector(selectAlgorithm, (algorithm) => algorithm.invalidateAlgorithm);
export const selectPointerLine = createSelector(selectAlgorithm, (algorithm) => algorithm.pointerLine);
export const selectCurrentController = createSelector(selectAlgorithm, (algorithm) => algorithm.currentController);
export const selectNodesRecord = createSelector(selectAlgorithm, selectNodesRecordFromAlgorithm);
export const selectAlgorithmObject = createSelector(selectAlgorithm, (algorithm) => algorithm.algorithm);
export const selectGetController = createSelector(selectAlgorithm, (algorithm) => algorithm.getController);
export const selectAlgorithmText = createSelector(selectAlgorithm, (algorithm) => algorithm.algorithmText);
export const selectConsiderations = createSelector(selectAlgorithm, selectConsiderationsFromAlgorithm);

export { reducer as AlgorithmReducer };