import { Controller } from "Algorithms/GenericController/IController";
import { IAlgorithmHandlers } from "Hooks/IHandlers";
import { useEffect } from "react";

export default function useStartAlgorithmWithNewController({
    setInvalidateAlgorithm, invalidateAlgorithm, algorithmController, handlers
}: {
    setInvalidateAlgorithm: (arg: any)=>void, invalidateAlgorithm: ()=>void, algorithmController: Controller,
    handlers: IAlgorithmHandlers
}) {
    useEffect(() => {
        //this is needed as useState set functions execute function arguments
        setInvalidateAlgorithm(invalidateAlgorithm);

        if (algorithmController.isMock)
            return;

        algorithmController.run(
            handlers.getNodesIdList(),
            handlers.getEdgesRepresentation()
        );

        return invalidateAlgorithm;
    }, [algorithmController]);
    
    useEffect(() => {
        //this is needed as useState set functions execute function arguments
        setInvalidateAlgorithm(invalidateAlgorithm);
    }, [invalidateAlgorithm]);
}