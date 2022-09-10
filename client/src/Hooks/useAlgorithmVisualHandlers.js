import { useDispatch, useSelector } from "react-redux";
import { selectConsiderations } from "../Store/algorithm/algorithmSlice";

export default function useAlgorithmVisualHandlers() {
    const dispatch = useDispatch();

    const considerations = useSelector(selectConsiderations);

    return {considerations};
}