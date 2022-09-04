import { useEffect } from "react";

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
                setVariable: (variableName) => allVariables[variableName] = true
            },
            algorithm
        });

        oneTimeController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );
    }, [getController]);
}