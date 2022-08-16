import VisNetworkReactComponent from "vis-network-react";
import {adjacencyMatrixToGraphRepresentation} from "../../../../../Utilities/graphs";
import { useEffect, useState } from "react";

export default function GraphContainer({nodes}) {
    const edgeList = adjacencyMatrixToGraphRepresentation(nodes.get("adjacencyMatrix"), "edgeList")
        .map(edge=>edge.toObject()).toArray();
    const nodesForGraph = nodes.nodes
        .map(node=>node.toObject())
        .map(nodeObj=>({...nodeObj, ...nodeObj.style}))
        .toArray();

    const [network, setNetwork] = useState({fit:()=>{}});

    const resGraph = {edges: edgeList, nodes: nodesForGraph};

    const [graph, setGraph] = useState(resGraph);

    useEffect(()=>{
        setGraph(resGraph);

        setTimeout(network.fit.bind(network), 1000);
    }, [nodes]);

    return (
        <VisNetworkReactComponent getNetwork={n=>setNetwork(n)} data={graph}></VisNetworkReactComponent>
    );
}