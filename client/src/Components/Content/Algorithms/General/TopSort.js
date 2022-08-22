import { useState } from "react";
import NodeContext from "../../../../Contexts/Controller/Node";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import { getNodesHandlers, getStartAlgorithmHandlers, getGraphCardHandlers } from "../../../../Utilities/algorithmHandlers";
import AlgorithmControllerCard from "../../../Common/Algorithms/AlgorithmControllerCard/AlgorithmControllerCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import GraphContext from "../../../../Contexts/Controller/Graph";
import TopSortAlgorithmContext from "../.././../../Contexts/Controller/TopSort/Algorithm";
import AlgorithmTextCard from "../../../Common/Algorithms/AlgorithmTextCard/AlgorithmTextCard";

export default function TopSort({nodesRecord, setNodesRecord}) {
    const [invalidateAlgorithm, setInvalidateAlgorithm] = useState(()=>{});

    const nodesCardHandlers = getNodesHandlers(nodesRecord, setNodesRecord, {invalidateAlgorithm});
    const startAlgorithmHandlers = getStartAlgorithmHandlers(nodesRecord, setNodesRecord);
    const graphCardHandlers = getGraphCardHandlers(nodesRecord, setNodesRecord);

    return (
        <>
            <NodeContext.Provider value={{handlers: nodesCardHandlers}}>
                <NodesCard/>
            </NodeContext.Provider>
            <TopSortAlgorithmContext.Provider
            value={{setInvalidateAlgorithm, handlers: startAlgorithmHandlers}}>
                <AlgorithmControllerCard/>
            </TopSortAlgorithmContext.Provider>
            <AlgorithmTextCard />
            <GraphContext.Provider value={{nodesRecord, handlers: graphCardHandlers}}>
                <GraphCard/>
            </GraphContext.Provider>
        </>
    );
}