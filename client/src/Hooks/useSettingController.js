import { useEffect } from "react";
import defaultValueByType from "../Algorithms/GenericController/getConsiderator";

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
                setVariable: (variableName, variableObject) =>
                    allVariables[variableName] = variableObject
            },
            algorithm
        });

        oneTimeController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );
    }, [getController]);
}