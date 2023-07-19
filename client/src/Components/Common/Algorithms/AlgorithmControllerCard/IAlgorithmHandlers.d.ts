import { IAlgorithm } from "Algorithms/IAlgorithm";

export interface IAlgorithmHandlers {
    getNodesIdList: ()=>List<string>;
    getEdgesRepresentation: <EdgesType>()=>EdgesRepresentation<EdgesType>;
    startAlgorithm: ()=>void;
    toggleAlgorithmPause: ()=>void;
    stopAlgorithm: ()=>void;
    pushForward: ()=>void;
    algorithm: IAlgorithm;
    goTo: (arg0: string)=>void
}

type EdgesRepresentation<Type extends EdgesRepresentationType> =
    Type extends EdgesRepresentationType.adjacencyList ? List<NodeRecord> : undefined;