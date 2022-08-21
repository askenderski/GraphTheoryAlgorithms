import {createContext} from "react";
import {NodesRecord} from "../../Records/NodesRecord/NodesRecord";

const NodeContext = createContext({
    handlers: {}
});

export default NodeContext;