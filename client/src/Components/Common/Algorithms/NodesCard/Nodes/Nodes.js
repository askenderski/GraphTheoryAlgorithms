import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";

export default function Nodes({nodes: nodesRecord, handlers = {}, isDeletingNode}) {
    return (
        <table>
            <TableHead isDeletingNode={isDeletingNode} handlers={handlers} />
            <TableBody handlers={handlers}/>
        </table>
    );
}