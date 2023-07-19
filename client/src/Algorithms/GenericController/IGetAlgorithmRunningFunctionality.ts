import { ISetAlgorithmState, ISetIsDone } from "Components/Common/Algorithms/AlgorithmControllerCard/IAlgorithmControllerContainer";

export interface IGetAlgorithmRunningFunctionality {
    (arg0: {
        setAlgorithmState: ISetAlgorithmState
        setIsDoneOutsideController: ISetIsDone;
    }): {
        setIsDone: ISetIsDone,
        outsideControls: IOutsideControls,
        waitToConsider: IWaitToConsider
    }
}

export interface IOutsideControls {
    pause:()=>void;
    unpause:()=>void;
    invalidate:()=>void;
    pushForward:()=>void
}

export interface IWaitToConsider {
    (time: number): Promise<void>;
}