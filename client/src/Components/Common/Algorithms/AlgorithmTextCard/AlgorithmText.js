import { useContext } from "react";
import AlgorithmTextContext from "../../../../Contexts/Controller/AlgorithmText";

export default function AlgorithmText() {
    const {algorithmText} = useContext(AlgorithmTextContext);

    return <div>{algorithmText}</div>;
}