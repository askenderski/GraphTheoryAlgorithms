import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";

export default function Nodes({nodes: nodesRecord, handlers: {setEdgeByIndex, deleteNode} = {}, isDeletingNode}) {
    const {nodeCount, nodes} = nodesRecord;

    return (
        <table>
            <TableHead nodes={nodes} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
            <TableBody nodeCount={nodeCount} nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex}/>
        </table>
    );
}