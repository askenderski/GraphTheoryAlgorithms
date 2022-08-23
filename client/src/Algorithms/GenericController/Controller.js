import { getConsiderator } from "./getConsiderator";
import { getAlgorithmRunningFunctionality } from "./getAlgorithmRunningFunctionality";

export default function getController(
    {setIsDone: setIsDoneOutsideController, waitTimes = {graphTime: 4000, pointerTime: 700}, setters, algorithm}
    ) {
    const {outsideControls, waitToConsider, setIsDone} =
        getAlgorithmRunningFunctionality({setIsDoneOutsideController});
    const considers = getConsiderator({waitToConsider, setters, waitTimes});

    const run = algorithm.getRun({setIsDone, considers});
    
    return {...outsideControls, run};
};