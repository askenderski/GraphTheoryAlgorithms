import {createContext} from "react";
import {NodesRecord} from "../Records/NodesRecord/NodesRecord";

const NodeContext = createContext({
    nodesRecord: NodesRecord(),
    handlers: {}
});

export default NodeContext;