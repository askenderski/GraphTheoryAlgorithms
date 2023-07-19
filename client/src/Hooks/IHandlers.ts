import { Controller, GetController } from "Algorithms/GenericController/IController";
import { EdgesRepresentationType, IAlgorithm } from "Algorithms/IAlgorithm";
import { IEdgeRecord } from "Records/EdgeRecord/EdgeRecord";
import { IEdgesRecord } from "Records/EdgesRecord/EdgesRecord";
import { INodeRecord } from "Records/NodeRecord/NodeRecord";
import { List } from "immutable";

export interface ISpecificAlgorithmHandlers {
    getNodesIdList: ()=>List<string>,
    getEdgesRepresentation: ()=>EdgesRepresentationType,
    setVariable: (name: string, value: any)=>any,
    setNodeStyle: (nodeId: string, style: {[key: string]: string})=>any
}

export type IAlgorithmHandlers = ISpecificAlgorithmHandlers & {
    algorithm: IAlgorithm<EdgesRepresentationType>,
    getController: GetController,
    setVariables: (variables: any)=>any,
    setPointerLine: (arg: number)=>any,
    setCurrentController: (arg: Controller)=>any,
    reset:()=>void,
    setInvalidateAlgorithm: (arg: any)=>void,
    addConsideration: (arg: any)=>void
}

export interface INodesHandlers {
    addNode: ()=>void;
    toggleIsDirected: ()=>void;
    toggleIsWeighted: ()=>void;
    deleteNode: (nodeId: string)=>void;
    setEdge: ({to, from}: {to: string, from: string}, value: any)=>void;
    getNodesList: ()=>List<INodeRecord>;
    getNodeCount: ()=>number;
    getEdgeByIndex: (index:number)=>IEdgeRecord;
    getIsWeighted: ()=>boolean;
    getIsDirected: ()=>boolean;
    getEdgeValue: (arg: IEdgeRecord)=>any;
    getEdge: ({to, from}: {to: string, from: string})=>IEdgeRecord;
    getNode: (nodeId: string)=>INodeRecord;
    getNodeLabel:(node: INodeRecord)=>string;
}