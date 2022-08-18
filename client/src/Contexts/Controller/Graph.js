import {createContext} from "react";
import { NodesRecord } from "../../Records/NodesRecord/NodesRecord";

const GraphContext = createContext({
    nodesRecord: NodesRecord()
});

export default GraphContext;