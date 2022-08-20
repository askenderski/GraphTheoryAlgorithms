import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";

export default function Nodes({nodes: nodesRecord, handlers: {setEdgeByIndex, deleteNode, getNodesArray} = {}, isDeletingNode}) {
    const {nodeCount} = nodesRecord;

    return (
        <table>
            <TableHead nodes={getNodesArray()} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
            <TableBody nodeCount={nodeCount} nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex}/>
        </table>
    );
}