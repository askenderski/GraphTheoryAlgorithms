export default function AlgorithmController({algorithmHandlers, algorithmState}) {
    const {startAlgorithm, toggleAlgorithmPause, stopAlgorithm} = algorithmHandlers;
    const {isRunning, isPaused} = algorithmState;

    return (
        <>
            <button onClick={startAlgorithm}>{isRunning ? "Restart" : "Start"}</button>
            <button onClick={toggleAlgorithmPause} disabled={!isRunning}>
                {isPaused ? "Unpause" : "Pause"}
            </button>
            <button onClick={stopAlgorithm} disabled={!isRunning}>Stop</button>
        </>
    );
}