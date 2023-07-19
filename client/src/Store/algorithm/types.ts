import { Controller, GetController } from "Algorithms/GenericController/IController";
import { EdgesRepresentationType, IAlgorithm } from "Algorithms/IAlgorithm";
import { INodesRecord } from "Records/NodesRecord/NodesRecord";

export interface IAlgorithmState {
    variables: {[key:string]: any},
    pointerLine: number,
    currentController: Controller,
    getController: GetController,
    algorithmText: string,
    algorithm: IAlgorithm<EdgesRepresentationType>,
    invalidateAlgorithm: Function,
    nodesRecord: INodesRecord,
    considerations: any[]
}
  
export enum AlgorithmActionTypesMap {
    addConsideration = "@@inventory/addConsideration",
    setConsiderations = "@@inventory/setConsiderations",
    setAlgorithmText = "@@inventory/setAlgorithmText",
    setGetController = "@@inventory/setGetController",
    setAlgorithm = "@@inventory/setAlgorithm",
    setVariables = "@@inventory/setVariables",
    mergeVariables = "@@inventory/mergeVariables",
    setPointerLine = "@@inventory/setPointerLine",
    setCurrentController = "@@inventory/setCurrentController",
    setInvalidateAlgorithm = "@@inventory/setInvalidateAlgorithm",
    setNodesRecord = "@@inventory/setNodesRecord",
    changeNodesRecord = "@@inventory/changeNodesRecord"
}