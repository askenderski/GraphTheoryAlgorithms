import { useState, useMemo } from "react";
import NodeContext from "../../../../Contexts/Controller/Node";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import { getNodesHandlers, getStartAlgorithmHandlers } from "../../../../Utilities/algorithmHandlers";
import StartAlgorithmCard from "../../../Common/Algorithms/StartAlgorithmCard/StartAlgorithmCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import GraphContext from "../../../../Contexts/Controller/Graph";
import TopSortAlgorithmContext from "../.././../../Contexts/Controller/TopSort/Algorithm";

export default function TopSort({nodesRecord, setNodesRecord}) {
    const [invalidateAlgorithm, setInvalidateAlgorithm] = useState(()=>{});

    const nodesCardHandlers = useMemo(
        ()=>getNodesHandlers(setNodesRecord, {invalidateAlgorithm}),[invalidateAlgorithm]
    );
    const startAlgorithmHandlers = getStartAlgorithmHandlers(setNodesRecord);

    return (
        <>
            <NodeContext.Provider value={{nodesRecord, handlers: nodesCardHandlers}}>
                <NodesCard/>
            </NodeContext.Provider>
            <TopSortAlgorithmContext.Provider
            value={{nodesRecord, setInvalidateAlgorithm, handlers: startAlgorithmHandlers}}>
                <StartAlgorithmCard/>
            </TopSortAlgorithmContext.Provider>
            <GraphContext.Provider value={{nodesRecord}}>
                <GraphCard/>
            </GraphContext.Provider>
        </>
    );
}