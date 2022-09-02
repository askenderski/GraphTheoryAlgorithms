import TopSortText from "../../../../Algorithms/General/TopSort/TopSortText";
import { useState } from "react";
import NodeContext from "../../../../Contexts/Controller/Node";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import { getNodesHandlers, getStartAlgorithmHandlers, getGraphCardHandlers } from "../../../../Utilities/algorithmHandlers";
import AlgorithmControllerCard from "../../../Common/Algorithms/AlgorithmControllerCard/AlgorithmControllerCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import GraphContext from "../../../../Contexts/Controller/Graph";
import TopSortAlgorithmContext from "../.././../../Contexts/Controller/TopSort/Algorithm";
import AlgorithmTextCard from "../../../Common/Algorithms/AlgorithmTextCard/AlgorithmTextCard";
import AlgorithmTextContext from "../../../../Contexts/Controller/AlgorithmText";
import VariablesContext from "../../../../Contexts/Controller/Variables";
import VariablesControllerCard from "../../../Common/Algorithms/VariablesControllerCard/VariablesControllerCard";
import { selectVariables, setVariables as setVariablesAction } from "../../../../Store/algorithm/algorithmSlice";
import {useDispatch, useSelector} from "react-redux";

const algorithmText = TopSortText;

export default function TopSort({nodesRecord, setNodesRecord}) {
    const dispatch = useDispatch();

    const variables = useSelector(selectVariables);
    const setVariables = variables => dispatch(setVariablesAction(variables));
  
    const [invalidateAlgorithm, setInvalidateAlgorithm] = useState(()=>{});
    const [pointerLine, setPointerLine] = useState();
    const [currentController, setCurrentController] = useState();    

    const nodesCardHandlers = getNodesHandlers(nodesRecord, setNodesRecord, {invalidateAlgorithm});
    const startAlgorithmHandlers = getStartAlgorithmHandlers(nodesRecord, setNodesRecord,
        {setPointerLine, setVariables, variables, setCurrentController});
    const graphCardHandlers = getGraphCardHandlers(nodesRecord, setNodesRecord);

    return (
        <>
            <NodeContext.Provider value={{handlers: nodesCardHandlers}}>
                <NodesCard/>
            </NodeContext.Provider>
            <TopSortAlgorithmContext.Provider
            value={{setInvalidateAlgorithm, currentController, handlers: startAlgorithmHandlers}}>
                <AlgorithmControllerCard/>
            </TopSortAlgorithmContext.Provider>
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