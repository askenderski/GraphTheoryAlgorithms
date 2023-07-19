import { IGetAlgorithmRunningFunctionality } from "./IGetAlgorithmRunningFunctionality";
import ITimeout from "Types/ITimeout";

const getAlgorithmRunningFunctionality: IGetAlgorithmRunningFunctionality =
    function ({ setIsDoneOutsideController, setAlgorithmState }) {
        const setIsPaused = (isPaused: boolean)=>setAlgorithmState({isPaused});
        const setIsRunning = (isRunning: boolean)=>setAlgorithmState({isRunning});

        let isDone = false;
        let isPaused = false;
        let timeout: ITimeout;

        const waitToConsider = async (time: number) => {
            return new Promise<void>((resolve, reject) => {
                doAlgorithmUnpause = () => {
                    resolve();
                };
                doStopAlgorithm = reject;

                timeout = setTimeout(() => {
                    if (isPaused) return;

                    doAlgorithmUnpause();
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

        let doAlgorithmUnpause: ()=>void;
        let doStopAlgorithm: ()=>void;

        function unpause() {
            if (!isPaused) return;

            doAlgorithmUnpause();
            isPaused = false;
            
            setIsPaused(false);
        }

        function pause() {
            isPaused = true;
            setIsPaused(true);
            clearTimeout(timeout);
        }

        function setIsDone(flag?: boolean) {
            isDone = true;
            return setIsDoneOutsideController(flag);
        }

        function pushForward() {
            doAlgorithmUnpause();
            pause();
        }

        return { setIsDone, outsideControls: { pause, unpause, invalidate, pushForward }, waitToConsider };
    };

export default getAlgorithmRunningFunctionality;