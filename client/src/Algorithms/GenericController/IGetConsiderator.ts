import { IAddConsideration, ISetters, IWaitTimes } from "./IController"
import { IWaitToConsider } from "./IGetAlgorithmRunningFunctionality"

export interface IGetConsiderator {
    (arg0: {
        setters: ISetters,
        waitTimes?: IWaitTimes,
        waitToConsider: IWaitToConsider,
        addConsideration: IAddConsideration
    }):IConsiderator
}

export interface INodeType {
    [key:string]: string
}

export interface INodeTypes {
    [key:string]: INodeType
}

export interface IGetGraphConsiderator {
    (arg0: {
        nodeTypes?: INodeTypes,
        setNodeStyle: (nodeName: string, nodeStyle: {[key:string]: any})=>void
    }):(node: string, type: string)=>void
}

export interface IGetPointerConsiderator {
    (arg0: {
        setPointerLine: (arg0: number)=>void
    }):(arg0:number)=>void
}

export interface IGetVariableConsiderator {
    (arg0: {
        setVariable: (name: string, val: any)=>void
    }):(
        variableType: ("integer" | "array" | "objectArray"),
        name: string, considerationType: string, ...rest: [any]
    )=>any
}

export type IVariableConsiderators = {
    [key in "integer"|"array"|"objectArray"]: {[key:string]:(...args: [any])=>any}
}

export interface IConsiderator {
    consider: (...args: any[])=>Promise<void>;
    considerOriginal: (...args: any[])=>void;
    considerGraph: (...args: any[])=>Promise<void>;
    considerInteger: (...args: any[])=>Promise<void>;
    considerPointerLine: (...args: any[])=>Promise<void>;
    considerArray: (...args: any[])=>Promise<void>;
    considerObjectArray: (...args: any[])=>Promise<void>;
}