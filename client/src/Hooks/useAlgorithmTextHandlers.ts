import { useSelector } from "react-redux";
import { selectAlgorithmText, selectPointerLine } from "../Store/algorithm/reducer";

export default function useAlgorithmTextHandlers() {
    const pointerLine = useSelector(selectPointerLine);
    const algorithmText = useSelector(selectAlgorithmText);

    return {pointerLine, algorithmText};
}