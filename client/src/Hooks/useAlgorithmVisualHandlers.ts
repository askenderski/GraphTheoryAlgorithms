import { useSelector } from "react-redux";
import { selectConsiderations, selectCurrentController } from "../Store/algorithm/reducer";

export default function useAlgorithmVisualHandlers() {
    const considerations = useSelector(selectConsiderations);

    const controller = useSelector(selectCurrentController);

    return {considerations, controller};
}