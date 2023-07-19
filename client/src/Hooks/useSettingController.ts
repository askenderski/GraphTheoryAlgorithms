import { useEffect } from "react";
import {defaultValueByType} from "../Algorithms/GenericController/getConsiderator";
import { GetController } from "Algorithms/GenericController/IController";
import { EdgesRepresentationType } from "Algorithms/IAlgorithm";
import { IAlgorithm } from "Algorithms/IAlgorithm";
import { IAlgorithmHandlers } from "./IHandlers";

export default function useSettingController(
    { getController, handlers, algorithm }: {
        getController: GetController,
        handlers: IAlgorithmHandlers,
        algorithm: IAlgorithm<EdgesRepresentationType>
    }) {
    useEffect(() => {
        if (getController.isMock) return;

        const allVariables: {[key: string]: {type: string, value: any}} = {};

        const oneTimeController = getController({
            setIsDone: () => {
                handlers.setVariables(allVariables);
            },
            waitTimes: {
                graph: 0,
                pointerLine: 0,
                variable: 0
            },
            styleSetters: {
                setNodeStyle: () => { },
                setPointerLine: () => { },
                setVariable: (variableName, variableObject) => {
                    const {type}: {type: "integer" | "array" | "objectArray"} = variableObject;
                    allVariables[variableName] = {type, value: defaultValueByType[type]}
                }
            },
            addConsideration: ()=>{},
            algorithm,
            setAlgorithmState: (state: {})=>{}
        });

        oneTimeController.run(handlers.getNodesIdList(), handlers.getEdgesRepresentation());
    }, [getController]);
}