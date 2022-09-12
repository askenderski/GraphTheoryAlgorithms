import { useDispatch, useSelector } from "react-redux";
import { selectConsiderations, selectCurrentController } from "../Store/algorithm/algorithmSlice";

export default function useAlgorithmVisualHandlers() {
    const dispatch = useDispatch();

    const considerations = useSelector(selectConsiderations);

    const controller = useSelector(selectCurrentController);

    return {considerations, controller};
}