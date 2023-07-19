import { IAlgorithm, EdgesRepresentationType, IRun } from "Algorithms/IAlgorithm";
import { ISetAlgorithmState, ISetIsDone } from "Components/Common/Algorithms/AlgorithmControllerCard/IAlgorithmControllerContainer";

export interface Controller {
    pause: ()=>void;
    unpause: ()=>void;
    invalidate: ()=>void;
    pushForward: ()=>void;
    goTo: (arg0: string)=>void;
    run: IRun<EdgesRepresentationType>;
    isMock?: boolean;
}

export interface StyleSetters {
    setNodeStyle: (...props: any)=>void,
    setVariable: (...props: any)=>void,
    setPointerLine: (...props: any)=>void
}

export interface GetController {
    (prop: {
        setIsDone: ISetIsDone,
        styleSetters: StyleSetters,
        addConsideration: (...props: any)=>void,
        setAlgorithmState: ISetAlgorithmState,
        algorithm: IAlgorithm<EdgesRepresentationType>,
        waitTimes?: {[key in "graph" | "pointerLine" | "variable"]: number}
    }): Controller,
    isMock?: boolean
}

interface IConsiderOriginal {
    (...args: Array<any>): void
}

export interface GetTimeTravelFunctionality {
    (arg0: {
        consider: IConsiderOriginal,
        outsideControls: { pause:()=>void, unpause:()=>void, invalidate:()=>void, pushForward:()=>void }
    }): {
        addConsideration: IAddConsideration,
        outsideControls: {
            pause:()=>void, unpause:()=>void, invalidate:()=>void, pushForward:()=>void,
            goTo: (id: string)=>void
        }
    }
}

export interface ISetters {
    setNodeStyle: (nodeName: string, nodeStyle: {[key:string]: any})=>void;
    setVariable: (name: string, arg1: {type: string, value: any})=>void;
    setPointerLine: (pointerLine: number)=>void;
}

export interface IWaitTimes {
    graph: number;
    pointerLine: number;
    variable: number;
}

export interface IAddConsideration {
    (...args: Array<any>): void;
}