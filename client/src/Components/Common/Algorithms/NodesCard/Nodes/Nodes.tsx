import { TableHead } from "./TableHead/TableHead";
import { TableBody } from "./TableBody/TableBody";
import { INodesHandlers } from "Hooks/IHandlers";

interface INodesProps extends React.PropsWithChildren {
    isDeletingNode: boolean;
    handlers: INodesHandlers;
}

export default function Nodes({handlers, isDeletingNode}: INodesProps) {
    return (
        <table>
            <TableHead isDeletingNode={isDeletingNode} handlers={handlers} />
            <TableBody handlers={handlers}/>
        </table>
    );
}