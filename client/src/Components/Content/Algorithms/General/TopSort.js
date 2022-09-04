import TopSortText from "../../../../Algorithms/General/TopSort/TopSortText";
import { useEffect } from "react";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import algorithm from "../../../../Algorithms/General/TopSort/TopSort";
import { getGraphCardHandlers } from "../../../../Utilities/algorithmHandlers";
import AlgorithmControllerCard from "../../../Common/Algorithms/AlgorithmControllerCard/AlgorithmControllerCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import GraphContext from "../../../../Contexts/Controller/Graph";
import AlgorithmTextCard from "../../../Common/Algorithms/AlgorithmTextCard/AlgorithmTextCard";
import AlgorithmTextContext from "../../../../Contexts/Controller/AlgorithmText";
import VariablesContext from "../../../../Contexts/Controller/Variables";
import VariablesControllerCard from "../../../Common/Algorithms/VariablesControllerCard/VariablesControllerCard";
import { selectVariables } from "../../../../Store/algorithm/algorithmSlice";
import { selectInvalidateAlgorithm } from "../../../../Store/algorithm/algorithmSlice";
import { selectPointerLine } from "../../../../Store/algorithm/algorithmSlice";
import {setGetController as setGetControllerAction, setAlgorithm as setAlgorithmAction}
    from "../../../../Store/algorithm/algorithmSlice";
import {useDispatch, useSelector} from "react-redux";
import getController from "../../../../Algorithms/GenericController/Controller";

const algorithmText = TopSortText;

export default function TopSort({nodesRecord, setNodesRecord}) {
    const dispatch = useDispatch();

    const variables = useSelector(selectVariables);

    const invalidateAlgorithm = useSelector(selectInvalidateAlgorithm);
  
    const pointerLine = useSelector(selectPointerLine);

    const graphCardHandlers = getGraphCardHandlers(nodesRecord, setNodesRecord);

    useEffect(()=>{
        dispatch(setGetControllerAction(getController));
        dispatch(setAlgorithmAction(algorithm));
    }, []);

    return (
        <>
            <NodesCard/>
            <AlgorithmControllerCard/>
            <AlgorithmTextContext.Provider value={{algorithmText, pointerLine}}>
                <AlgorithmTextCard />
            </AlgorithmTextContext.Provider>
            <GraphContext.Provider value={{nodesRecord, handlers: graphCardHandlers}}>
                <GraphCard/>
            </GraphContext.Provider>
            <VariablesContext.Provider value={{variables}}>
                <VariablesControllerCard/>
            </VariablesContext.Provider>
        </>
    );
}