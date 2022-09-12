import getConsiderator from "./getConsiderator";
import { getAlgorithmRunningFunctionality } from "./getAlgorithmRunningFunctionality";
import getTimeTravelFunctionality from "./getTimeTravelFunctionality";
import {v4 as uuidv4} from "uuid";

export default function getController(args) {
    const {setIsDone: setIsDoneOutsideController, setAlgorithmState=()=>{}, addConsideration: addConsiderationArgs} = args;
    const {outsideControls: outsideControlsDef, waitToConsider, setIsDone} =
        getAlgorithmRunningFunctionality({setIsDoneOutsideController, setAlgorithmState});

    const addConsideration = (...args) => {
        const id = uuidv4();

        addConsiderationArgs(...args, id);
        addConsiderationTimeTravel(...args, id);
    };
    
    const {waitTimes, styleSetters, algorithm} = args;
    const considers = getConsiderator({waitToConsider, setters: styleSetters, waitTimes, addConsideration});
    const {addConsideration: addConsiderationTimeTravel, outsideControls} = getTimeTravelFunctionality({
        consider: considers.consider, outsideControls: outsideControlsDef
    });

    const run = function (...args) {
        setAlgorithmState({isRunning: true});

        return algorithm.getRun({setIsDone, considers})(...args);
    }
    
    return {...outsideControls, run};
};