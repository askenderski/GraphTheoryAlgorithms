import VisNetworkReactComponent from "vis-network-react";
import {edgesRecordToGraphRepresentation} from "../../../../../Utilities/graphs";
import { useEffect, useState } from "react";
import { useGraphHandlers } from "./useGraphHandlers";

const getEdgeList = edgesRecord => {
    const edgeListAsImmutable = edgesRecordToGraphRepresentation(edgesRecord, "edgeList");

    return edgeListAsImmutable.toJS();
}

const getNodesAsJS = nodes => {
    return nodes.toJS()
        //every node has its style combined with itself as in the Record the style is a property with own props
        // and for VisJS style props are part of node props
        .map(node=>({...node, ...node.style}));
}

const defaultNetwork = {fit:()=>{}};

export default function GraphContainer() {
    const handlers = useGraphHandlers();

    const nodesRecord = handlers.nodesRecord;

    const edges = getEdgeList(nodesRecord.get("edgesRecord"));
    const nodes = getNodesAsJS(handlers.getNodes());

    const [network, setNetwork] = useState(defaultNetwork);

    const resGraph = {edges, nodes};

    const [graph, setGraph] = useState(resGraph);

    //Upon change in the nodes record (be it edge or node change), the graph view is changed to fit the nodes
    // as otherwise they sometimes "escape" the viewing window
    useEffect(()=>{
        setGraph(resGraph);

        setTimeout(network.fit.bind(network), 1000);
    }, [nodesRecord]);

    return (
        <VisNetworkReactComponent getNetwork={setNetwork} data={graph} />
    );
}