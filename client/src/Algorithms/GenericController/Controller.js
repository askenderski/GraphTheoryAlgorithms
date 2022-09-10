import getConsiderator from "./getConsiderator";
import { getAlgorithmRunningFunctionality } from "./getAlgorithmRunningFunctionality";

export default function getController(args) {
    const {setIsDone: setIsDoneOutsideController, setAlgorithmState=()=>{}, addConsideration} = args;
    const {outsideControls, waitToConsider, setIsDone} =
        getAlgorithmRunningFunctionality({setIsDoneOutsideController, setAlgorithmState});
    
    const {waitTimes, styleSetters, algorithm} = args;
    const considers = getConsiderator({waitToConsider, setters: styleSetters, waitTimes, addConsideration});

    const run = function (...args) {
        setAlgorithmState({isRunning: true});

        return algorithm.getRun({setIsDone, considers})(...args);
    }
    
    return {...outsideControls, run};
};