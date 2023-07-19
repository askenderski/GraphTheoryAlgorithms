import { INodeRecord } from "Records/NodeRecord/NodeRecord";
import { Header } from "../Common";
import Cell from "./Cell";
import { INodesHandlers } from "Hooks/IHandlers";

function VerticalHeader({label}: {label: string}) {
    return <Header label={label}/>;
}

function TableBodyRow({nodeFrom, handlers}: {nodeFrom: INodeRecord, handlers: INodesHandlers}) {
    const getCell = (nodeTo: INodeRecord) =>
        <Cell
        key={`${nodeFrom.get("id")} ${nodeTo.get("id")}`} nodeFrom={nodeFrom} nodeTo={nodeTo} handlers={handlers}
        />;

    const cells = handlers.getNodesList().map(getCell);

    return <tr>
        <VerticalHeader label={handlers.getNodeLabel(nodeFrom)} />
        {cells}
        </tr>;
}

export function TableBody({handlers}: {handlers: INodesHandlers}) {
    const getTableBodyRow = (nodeFrom: INodeRecord) =>
        <TableBodyRow key={nodeFrom.get("id")} nodeFrom={nodeFrom}
        handlers={handlers}/>;

    const rows = handlers.getNodesList().map(getTableBodyRow);

    return <tbody>
        {rows}
    </tbody>;
}