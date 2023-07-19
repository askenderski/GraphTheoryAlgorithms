import getConsiderator from "./getConsiderator";
import getAlgorithmRunningFunctionality from "./getAlgorithmRunningFunctionality";
import getTimeTravelFunctionality from "./getTimeTravelFunctionality";
import {v4 as uuidv4} from "uuid";
import { GetController } from "./IController";
import { EdgesRepresentationType, IRun } from "Algorithms/IAlgorithm";
import { List } from "immutable";

const getController: GetController = function (args) {
    const {setIsDone: setIsDoneOutsideController, setAlgorithmState=()=>{}, addConsideration: addConsiderationArgs} = args;
    const {outsideControls: outsideControlsDef, waitToConsider, setIsDone} =
        getAlgorithmRunningFunctionality({setIsDoneOutsideController, setAlgorithmState});

    const addConsideration = (args: Array<any>) => {
        const id = uuidv4();
        addConsiderationArgs([...args, id]);
        addConsiderationTimeTravel(...args, id);
    };
    
    const {waitTimes, styleSetters, algorithm} = args;
    const considers = getConsiderator({waitToConsider, setters: styleSetters, waitTimes, addConsideration});
    const {addConsideration: addConsiderationTimeTravel, outsideControls} = getTimeTravelFunctionality({
        consider: considers.considerOriginal, outsideControls: outsideControlsDef
    });

    const run: IRun<EdgesRepresentationType> = function (nodesIds: List<string>, edgeList: EdgesRepresentationType) {
        setAlgorithmState({isRunning: true});

        return algorithm.getRun({setIsDone, considers})(nodesIds, edgeList);
    }
    
    return {...outsideControls, run};
};

export default getController;