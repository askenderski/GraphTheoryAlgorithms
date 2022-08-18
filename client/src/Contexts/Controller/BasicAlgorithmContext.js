import {createContext} from "react";
import {NodesRecord} from "../../Records/NodesRecord/NodesRecord";

const BasicAlgorithmContext = createContext({
    nodesRecord: NodesRecord(),
    handlers: {}
});

export default BasicAlgorithmContext;