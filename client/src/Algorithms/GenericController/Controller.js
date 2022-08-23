import getConsiderator from "./getConsiderator";
import { getAlgorithmRunningFunctionality } from "./getAlgorithmRunningFunctionality";

export default function getController(args) {
    const {setIsDone: setIsDoneOutsideController} = args;
    const {outsideControls, waitToConsider, setIsDone} =
        getAlgorithmRunningFunctionality({setIsDoneOutsideController});
    
    const {waitTimes, setters, algorithm} = args;
    const considers = getConsiderator({waitToConsider, setters, waitTimes});

    const run = algorithm.getRun({setIsDone, considers});
    
    return {...outsideControls, run};
};