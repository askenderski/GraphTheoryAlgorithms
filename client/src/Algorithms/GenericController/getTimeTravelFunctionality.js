export default function getTimeTravelFunctionality({consider, outsideControls}) {
    let considerations = [];
    let indexOfCurrentConsideration = -1;

    function addConsideration(...args) {
        considerations.push(args);
        indexOfCurrentConsideration=considerations.length-1;
    }

    return {addConsideration};
};