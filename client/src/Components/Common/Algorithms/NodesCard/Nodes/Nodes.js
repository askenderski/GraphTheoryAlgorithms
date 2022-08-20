import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";

export default function Nodes({nodes: nodesRecord, handlers: {setEdgeByIndex, getNodeCount, deleteNode, getNodesArray} = {}, isDeletingNode}) {
    return (
        <table>
            <TableHead nodes={getNodesArray()} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
            <TableBody nodeCount={getNodeCount()} nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex}/>
        </table>
    );
}