import useAlgorithmVisualHandlers from "../../../../Hooks/useAlgorithmVisualHandlers";

export default function AlgorithmVisualControllerContainer() {
    const {considerations} = useAlgorithmVisualHandlers();

    return <ul>
        {considerations.map(consideration=><li>{consideration.join(" ")}</li>)}
    </ul>;
}