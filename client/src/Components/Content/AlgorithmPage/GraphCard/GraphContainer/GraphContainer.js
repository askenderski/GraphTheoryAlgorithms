import VisNetworkReactComponent from "vis-network-react";
import {adjacencyMatrixToGraphRepresentation} from "../../../../../Utilities/graphs";
import { useEffect, useRef, useState } from "react";

const graph = {
    nodes: [
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
    ]
};

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