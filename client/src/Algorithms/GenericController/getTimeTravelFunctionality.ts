import { defaultNodeStyle } from "../../Data/Algorithms/graph";
import { GetTimeTravelFunctionality } from "./IController";

const getTimeTravelFunctionality: GetTimeTravelFunctionality =
    function ({consider, outsideControls: outsideControlsArg}) {
        let considerations: Array<Array<any>> = [];
        let indexOfCurrentConsideration = -1;

        function addConsideration(...args: Array<any>) {
            considerations.push(args);
            indexOfCurrentConsideration=considerations.length-1;
        }

        function overwriteConsiderations(
            considerationsToOverwrite: Array<Array<any>>, considerationsToApply: Array<Array<any>>
        ) {
            considerationsToOverwrite.forEach(cons=>{
                const [type] = cons;
                
                switch (type) {
                    case "graph": {
                        const [_, nodeId] = cons;
                        const lastConsiderationForNode = considerationsToApply.find(
                            cons=>cons[0]==="graph"&&cons[1]===nodeId
                        );
                        if (lastConsiderationForNode !== undefined) {
                            return consider(...lastConsiderationForNode);
                        } else {
                            return consider("graph", nodeId, defaultNodeStyle);
                        }
                    }
                    case "pointerLine": {
                        const lastConsiderationForPointerLine = considerationsToApply.find(
                            cons=>cons[0]==="pointerLine"
                        );
                        if (lastConsiderationForPointerLine) {
                            return consider(...lastConsiderationForPointerLine);
                        } else {
                            return consider("pointerLine", -1);
                        }
                    }
                    case "variable": {
                        const [_, variableType, name] = cons;
                        const lastConsiderationForVariable = considerationsToApply.find(
                            cons=>cons[0]==="variable"&&cons[1]===variableType&&cons[2]===name
                        );
                        if (lastConsiderationForVariable) {
                            return consider(...lastConsiderationForVariable);
                        } else {
                            return consider("variable", variableType, name, "remove");
                        }
                    }
                }
            });
        }

        const outsideControls = {
            ...outsideControlsArg,
            goTo: (id: string) => {
                const index = considerations.findIndex(a=>a[a.length-1]===id);

                if (indexOfCurrentConsideration === undefined || index < indexOfCurrentConsideration) {
                    const appliedConsiderations = considerations.slice(0, index+1).reverse();
                    const considerationsToRemove = considerations.slice(index+1);

                    overwriteConsiderations(considerationsToRemove, appliedConsiderations);
                } else {
                    const considerationsToRenew = considerations.slice(indexOfCurrentConsideration, index+1);

                    overwriteConsiderations(considerationsToRenew, considerationsToRenew.slice().reverse());
                }

                indexOfCurrentConsideration = index;
            }
        };

        return {addConsideration, outsideControls};
    };

export default getTimeTravelFunctionality;