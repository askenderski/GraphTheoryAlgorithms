import NodeContext from "../../../../Contexts/Controller/Node";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import { getHandlers } from "../../../../Utilities/algorithmHandlers";
import StartAlgorithmCard from "../../../Common/Algorithms/StartAlgorithmCard/StartAlgorithmCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";
import GraphContext from "../../../../Contexts/Controller/Graph";
import TopSortAlgorithmContext from "../.././../../Contexts/Controller/TopSort/Algorithm";

const algorithmType = "General";
const algorithmTitle = "TopSort";

export default function TopSort({nodesRecord, setNodesRecord}) {
    const nodesCardHandlers = getHandlers(nodesRecord, setNodesRecord);

    return (
        <>
            <NodeContext.Provider value={{nodesRecord, handlers: nodesCardHandlers}}>
                <NodesCard/>
            </NodeContext.Provider>
            <TopSortAlgorithmContext.Provider value={{nodesRecord, handlers: nodesCardHandlers}}>
                <StartAlgorithmCard algorithmType={algorithmType}
                algorithmTitle={algorithmTitle}/>
            </TopSortAlgorithmContext.Provider>
            <GraphContext.Provider value={{nodesRecord}}>
                <GraphCard/>
            </GraphContext.Provider>
        </>
    );
}