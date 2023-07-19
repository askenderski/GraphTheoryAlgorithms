import TopSortText from "Algorithms/General/TopSort/Text";
import { useEffect } from "react";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import algorithm from "Algorithms/General/TopSort/Algorithm";
import AlgorithmControllerCard from "../../../Common/Algorithms/AlgorithmControllerCard/AlgorithmControllerCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import AlgorithmTextCard from "../../../Common/Algorithms/AlgorithmTextCard/AlgorithmTextCard";
import VariablesControllerCard from "../../../Common/Algorithms/VariablesControllerCard/VariablesControllerCard";
import { selectNodesRecord } from "../../../../Store/algorithm/reducer";
import {useDispatch, useSelector} from "react-redux";
import getController from "../../../../Algorithms/General/TopSort/getController";
import { defaultValueByType } from "Algorithms/GenericController/getConsiderator";
import { algorithmActions } from "Store/store";

const {setAlgorithmText: setAlgorithmTextAction,  setGetController: setGetControllerAction,
    setAlgorithm: setAlgorithmAction} = algorithmActions;

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
                nodesTopSorted: (arr: string[]) =>
                    arr.map((nodeId: string)=>nodesRecord.getNodeById(nodeId)?.get("value") || nodeId),
                visited: (arr: [string,string][]) => {
                    if (arr === defaultValueByType.objectArray) return arr;

                    return [
                            ...arr,
                            ...nodesRecord.get("nodes")
                                .map(node=>node.get("id"))
                                .filter(nodeId=>!arr.map(([key])=>key).includes(nodeId))
                                .map(nodeId=>[nodeId, "false"])
                        ]
                        .map(([key, val])=>[nodesRecord.getNodeById(key).get("value"), val.toString()])
                        .sort(([key1],[key2]) => key1 - key2)
                },
                node: (nodeId: string) => nodesRecord.getNodeById(nodeId)?.get("value") || nodeId
            }}/>
        </>
    );
}