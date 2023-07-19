import { Collection, List, Map } from "immutable";
import {IEdgeRecord} from "../Records/EdgeRecord/EdgeRecord";
import { IConsiderator } from "./GenericController/IGetConsiderator";

export interface IAlgorithm<T extends EdgesRepresentationType> {
    getRun: (arg0: {considers: IConsiderator, setIsDone: (arg0?: boolean)=>void}) => IRun<T>,
    graphRepresentation: string
}

export interface IRun<T extends EdgesRepresentationType> {
  (nodesIds: List<string>, edgeList: T):void;
}

export type IAdjacencyList = Map<string, List<IEdgeRecord>>;
export type IEdgeList = Collection<string, boolean | number>;
export type IAdjacencyMatrix = Map<string, Map<string, IEdgeRecord>>;

export type EdgesRepresentationType = IAdjacencyList | IAdjacencyMatrix | IEdgeList;