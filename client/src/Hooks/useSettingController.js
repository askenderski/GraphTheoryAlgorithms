import { useEffect } from "react";
import {defaultValueByType} from "../Algorithms/GenericController/getConsiderator";

export default function useSettingController({ getController, handlers, algorithm }) {
    useEffect(() => {
        if (getController.isMock) return;

        const allVariables = {};

        const oneTimeController = getController({
            setIsDone: () => {
                handlers.setVariables(allVariables);
            },
            waitTimes: {
                graphTime: 0,
                pointerTime: 0,
            },
            styleSetters: {
                setNodeStyle: () => { },
                setPointerLine: () => { },
                setVariable: (variableName, variableObject) => {
                    const {type} = variableObject;
                    console.log(type, defaultValueByType[type])
                    allVariables[variableName] = {type, value: defaultValueByType[type]}
                }
            },
            algorithm
        });

        oneTimeController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );
    }, [getController]);
}