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
    setAlgorithm as setAlgorithmAction,
    selectNodesRecord
} from "../../../../Store/algorithm/algorithmSlice";
import {useDispatch, useSelector} from "react-redux";
import getController from "../../../../Algorithms/GenericController/Controller";
import { defaultValueByType } from "../../../../Algorithms/GenericController/getConsiderator";

const algorithmText = TopSortText;

export default function TopSort() {
    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);

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
            <VariablesControllerCard parsers={{
                nodesTopSorted: arr => arr.map(nodeId=>(nodesRecord.getNodeById(nodeId) || {value: nodeId}).value),
                visited: arr => {
                    if (arr === defaultValueByType.objectArray) return arr;

                    return [
                            ...arr,
                            ...nodesRecord.nodes
                                .map(node=>node.id)
                                .filter(nodeId=>!arr.map(([key])=>key).includes(nodeId))
                                .map(nodeId=>[nodeId, "false"])
                        ]
                        .map(([key, val])=>[nodesRecord.getNodeById(key).value, val.toString()])
                        .sort(([key1],[key2]) => key1 - key2)
                }
            }}/>
        </>
    );
}