import TopSortText from "../../../../Algorithms/General/TopSort/TopSortText";
import { useEffect } from "react";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import algorithm from "../../../../Algorithms/General/TopSort/TopSort";
import AlgorithmControllerCard from "../../../Common/Algorithms/AlgorithmControllerCard/AlgorithmControllerCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import AlgorithmTextCard from "../../../Common/Algorithms/AlgorithmTextCard/AlgorithmTextCard";
import VariablesControllerCard from "../../../Common/Algorithms/VariablesControllerCard/VariablesControllerCard";
import {
    setAlgorithmText as setAlgorithmTextAction,  setGetController as setGetControllerAction,
    setAlgorithm as setAlgorithmAction
} from "../../../../Store/algorithm/algorithmSlice";
import {useDispatch} from "react-redux";
import getController from "../../../../Algorithms/GenericController/Controller";

const algorithmText = TopSortText;

export default function TopSort() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setGetControllerAction(getController));
        dispatch(setAlgorithmAction(algorithm));
        dispatch(setAlgorithmTextAction(algorithmText));
    }, []);

    return (
        <>
            <NodesCard/>
            <AlgorithmControllerCard/>
            <AlgorithmTextCard />
            <GraphCard/>
            <VariablesControllerCard/>
        </>
    );
}