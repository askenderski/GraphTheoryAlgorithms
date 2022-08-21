import { useState } from "react";
import NodeContext from "../../../../Contexts/Controller/Node";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import { getNodesHandlers, getStartAlgorithmHandlers, getGraphCardHandlers } from "../../../../Utilities/algorithmHandlers";
import StartAlgorithmCard from "../../../Common/Algorithms/StartAlgorithmCard/StartAlgorithmCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import GraphContext from "../../../../Contexts/Controller/Graph";
import TopSortAlgorithmContext from "../.././../../Contexts/Controller/TopSort/Algorithm";

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
                <StartAlgorithmCard/>
            </TopSortAlgorithmContext.Provider>
            <GraphContext.Provider value={{nodesRecord, handlers: graphCardHandlers}}>
                <GraphCard/>
            </GraphContext.Provider>
        </>
    );
}