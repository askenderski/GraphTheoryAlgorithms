import { defaultNodeStyle } from "../../Data/Algorithms/graph";

export default function getTimeTravelFunctionality({consider, outsideControls: outsideControlsArg}) {
    let considerations = [];
    let indexOfCurrentConsideration = -1;

    function addConsideration(...args) {
        considerations.push(args);
        indexOfCurrentConsideration=considerations.length-1;
    }

    const outsideControls = {
        ...outsideControlsArg,
        goTo: id => {
            const index = considerations.findIndex(a=>a[a.length-1]===id);
            const appliedConsiderations = considerations.slice(0, index+1).reverse();
            const considerationsToRemove = considerations.slice(index+1);

            indexOfCurrentConsideration = index;

            considerationsToRemove.forEach(cons=>{
                const [type] = cons;
                console.log(type)
                switch (type) {
                    case "graph": {
                        const [_, nodeId] = cons;
                        const lastConsiderationForNode = appliedConsiderations.find(
                            cons=>cons[0]==="graph"&&cons[1]===nodeId
                        );
                        if (lastConsiderationForNode) {
                            return consider(...lastConsiderationForNode);
                        } else {
                            return consider("graph", nodeId, defaultNodeStyle);
                        }
                    }
                    case "pointerLine": {
                        const lastConsiderationForPointerLine = appliedConsiderations.find(
                            cons=>cons[0]==="pointerLine"
                        );
                        console.log(lastConsiderationForPointerLine);
                        if (lastConsiderationForPointerLine) {
                            return consider(...lastConsiderationForPointerLine);
                        } else {
                            return consider("pointerLine", -1);
                        }
                    }
                    case "variable": {
                        const [_, variableType, name] = cons;
                        const lastConsiderationForVariable = appliedConsiderations.find(
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
    };

    return {addConsideration, outsideControls};
};