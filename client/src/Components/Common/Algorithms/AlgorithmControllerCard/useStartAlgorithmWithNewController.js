import { useEffect } from "react";

export default function useStartAlgorithmWithNewController({
    setInvalidateAlgorithm, invalidateAlgorithm, algorithmController, handlers, algorithm
}) {
    useEffect(() => {
        //this is needed as useState set functions execute function arguments
        setInvalidateAlgorithm(() => invalidateAlgorithm);

        if (algorithmController.isMock)
            return;

        algorithmController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation(algorithm.graphRepresentation)
        );

        return invalidateAlgorithm;
    }, [algorithmController]);
}
