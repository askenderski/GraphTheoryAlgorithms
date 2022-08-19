import VisNetworkReactComponent from "vis-network-react";
import {adjacencyMatrixToGraphRepresentation} from "../../../../../Utilities/graphs";
import { useContext, useEffect, useState } from "react";
import GraphContext from "../../../../../Contexts/Controller/Graph";

const getEdgeList = adjacencyMatrix => {
    const edgeListAsImmutable = adjacencyMatrixToGraphRepresentation(adjacencyMatrix, "edgeList");

    return edgeListAsImmutable.toJS();
}

const getNodes = nodes => {
    return nodes.toJS()
        //every node has its style combined with itself as in the Record the style is a property with own props
        // and for VisJS style props are part of node props
        .map(node=>({...node, ...node.style}));
}

const defaultNetwork = {fit:()=>{}};

export default function GraphContainer() {
    const {nodesRecord} = useContext(GraphContext);

    const edges = getEdgeList(nodesRecord.adjacencyMatrix);
    const nodes = getNodes(nodesRecord.nodes);

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