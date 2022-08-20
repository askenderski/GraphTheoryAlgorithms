import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";

export default function Nodes({nodes: nodesRecord, handlers = {}, isDeletingNode}) {
    const {deleteNode, getNodesArray, getNodeCount} = handlers;

    return (
        <table>
            <TableHead nodes={getNodesArray()} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
            <TableBody nodeCount={getNodeCount()} nodesRecord={nodesRecord} handlers={handlers}/>
        </table>
    );
}