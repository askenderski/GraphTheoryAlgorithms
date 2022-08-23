export function getAlgorithmRunningFunctionality({ setIsDoneOutsideController, setAlgorithmState }) {
    const setIsPaused = isPaused=>setAlgorithmState({isPaused});
    const setIsRunning = isRunning=>setAlgorithmState({isRunning});

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

        setIsRunning(false);
        setIsPaused(false);

        return;
    }

    let doAlgorithmUnpause;
    let doStopAlgorithm;

    function unpause() {
        if (!isPaused)
            return;

        doAlgorithmUnpause();
        isPaused = false;
        
        setIsPaused(false);
    }

    function pause() {
        isPaused = true;
        setIsPaused(true);
    }

    function setIsDone(...args) {
        isDone = true;
        return setIsDoneOutsideController(...args);
    }

    return { setIsDone, outsideControls: { pause, unpause, invalidate }, waitToConsider };
}
