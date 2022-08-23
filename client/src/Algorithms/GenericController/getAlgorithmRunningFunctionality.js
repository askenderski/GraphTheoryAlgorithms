export function getAlgorithmRunningFunctionality({ setIsDoneOutsideController }) {
    let isDone = false;
    let isPaused = false;

    const waitToConsider = async (time) => {
        return new Promise((resolve, reject) => {
            doAlgorithmUnpause = resolve;
            doStopAlgorithm = reject;

            setTimeout(() => {
                if (isPaused)
                    return;

                resolve();
            }, time);
        });
    };

    function invalidate() {
        if (!isPaused && !isDone) {
            doStopAlgorithm();
        }

        isDone = true;
        setIsDone(true);

        return;
    }

    let doAlgorithmUnpause;
    let doStopAlgorithm;

    function unpause() {
        if (!isPaused)
            return;

        doAlgorithmUnpause();
        isPaused = false;
    }

    function pause() {
        isPaused = true;
    }

    function setIsDone(...args) {
        isDone = true;
        return setIsDoneOutsideController(...args);
    }

    return { setIsDone, outsideControls: { pause, unpause, invalidate }, waitToConsider };
}
