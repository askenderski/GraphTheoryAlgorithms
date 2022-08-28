import {useContext} from "react";
import BasicAlgorithmContext from "../../../../Contexts/Controller/BasicAlgorithmContext";
import AlgorithmController from "./AlgorithmController";

export default function AlgorithmVisualControllerContainer() {
    const {handlers, currentController} = useContext(BasicAlgorithmContext);

    return null;
}