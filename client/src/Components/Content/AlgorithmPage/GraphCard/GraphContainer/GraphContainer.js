import VisNetworkReactComponent from "vis-network-react";
import {adjacencyMatrixToGraphRepresentation} from "../../../../../Utilities/graphs";
import { useEffect, useState } from "react";

export default function GraphContainer({nodes}) {
    const edgeList = adjacencyMatrixToGraphRepresentation(nodes.get("adjacencyMatrix"), "edgeList");
    const nodesForGraph = nodes.adjacencyMatrix.map((_,i)=>({
        id: i,
        label: i
    })).toArray();

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