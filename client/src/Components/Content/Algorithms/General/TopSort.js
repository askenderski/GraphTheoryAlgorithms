import NodeContext from "../../../../Contexts/Node";
import NodesCard from "../../../Common/Algorithms/NodesCard/NodesCard";
import { getHandlers } from "../../../../Utilities/algorithmHandlers";
import StartAlgorithmCard from "../../../Common/Algorithms/StartAlgorithmCard/StartAlgorithmCard";
import GraphCard from "../../../Common/Algorithms/GraphCard/GraphCard";

const algorithmType = "General";
const algorithmTitle = "TopSort";

export default function TopSort({nodesRecord, setNodesRecord}) {
    const nodesCardHandlers = getHandlers(nodesRecord, setNodesRecord);

    return (
        <>
            <NodeContext.Provider value={{nodesRecord, handlers: nodesCardHandlers}}>
                <NodesCard/>
            </NodeContext.Provider>
            <NodeContext.Provider value={{nodesRecord, handlers: nodesCardHandlers}}>
                <StartAlgorithmCard algorithmType={algorithmType}
                algorithmTitle={algorithmTitle}/>
            </NodeContext.Provider>
            <NodeContext.Provider value={{nodesRecord}}>
                <GraphCard/>
            </NodeContext.Provider>
        </>
    );
}