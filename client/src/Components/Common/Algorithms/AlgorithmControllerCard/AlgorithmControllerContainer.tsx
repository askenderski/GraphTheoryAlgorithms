import React, {useState, useEffect} from "react";
import AlgorithmController from "./AlgorithmController";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import useSettingController from "../../../../Hooks/useSettingController";
import useStartAlgorithmWithNewController from "./useStartAlgorithmWithNewController";
import useAlgorithmHandlers from "../../../../Hooks/useAlgorithmHandlers";
import { GetController, Controller } from "Algorithms/GenericController/IController";
import { ISetAlgorithmState } from "./IAlgorithmControllerContainer";

export default function AlgorithmControllerContainer() {
    const handlers = useAlgorithmHandlers();

    const algorithm = handlers.algorithm;
    const getController: GetController = handlers.getController;

    const setInvalidateAlgorithm = handlers.setInvalidateAlgorithm;

    const [algorithmState, setAlgorithmState] = useStateWithShallowMerge({isPaused: false, isRunning: false}) as
        [{isPaused: boolean, isRunning: boolean}, ISetAlgorithmState];

    const [algorithmController, setAlgorithmController] = useState<Controller>({
            pause: ()=>{}, unpause: ()=>{}, goTo: ()=>{}, pushForward: ()=>{}, invalidate: ()=>{}, run: ()=>{},
            isMock: true
        });

    function invalidateAlgorithm() {
        algorithmController.invalidate();
        handlers.reset();
    }

    useSettingController({getController, handlers, algorithm});

    useStartAlgorithmWithNewController({
        setInvalidateAlgorithm, invalidateAlgorithm, algorithmController, handlers
    });

    useEffect(()=>{
        handlers.setCurrentController(algorithmController);
    }, [algorithmController]);

    function startAlgorithm() {
        console.log("starting")

        setAlgorithmController(getController({
            setIsDone: () => setAlgorithmState({isRunning: false}),
            styleSetters: {
                setNodeStyle: handlers.setNodeStyle,
                setVariable: handlers.setVariable,
                setPointerLine: handlers.setPointerLine
            },
            addConsideration: handlers.addConsideration,
            setAlgorithmState,
            algorithm
        }));
    }

    function toggleAlgorithmPause() {
        if (algorithmState.isPaused) {
            algorithmController.unpause();
        } else {
            algorithmController.pause();
        }
    }

    const stopAlgorithm = algorithmController.invalidate;
    const pushForward = algorithmController.pushForward;
    const goTo = algorithmController.goTo;

    return <AlgorithmController
            algorithmHandlers={{
                getNodesIdList: ()=>{}, getEdgesRepresentation: ()=>{}, startAlgorithm, algorithm,
                toggleAlgorithmPause, stopAlgorithm, pushForward, goTo
            }}
            algorithmState={algorithmState}
            />;
}