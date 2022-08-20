import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";

export default function Nodes({nodes: nodesRecord, handlers = {}, isDeletingNode}) {
    const {getNodesArray, getNodeCount} = handlers;

    return (
        <table>
            <TableHead isDeletingNode={isDeletingNode} handlers={handlers} />
            <TableBody nodesRecord={nodesRecord} handlers={handlers}/>
        </table>
    );
}