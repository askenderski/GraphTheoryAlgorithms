import { Header } from "../Common";
import Cell from "./Cell";

function VerticalHeader({value}) {
    return <Header value={value}/>;
}

function TableBodyRow({nodeFrom, handlers}) {
    const getCell = nodeTo =>
        <Cell key={`${nodeFrom.id} ${nodeTo.id}`} nodeFrom={nodeFrom} nodeTo={nodeTo} handlers={handlers}/>;

    const cells = handlers.getNodesList().map(getCell);

    return <tr>
        <VerticalHeader value={nodeFrom.Value} />
        {cells}
        </tr>;
}

export function TableBody({handlers}) {
    const getTableBodyRow = nodeFrom =>
        <TableBodyRow key={nodeFrom.id} nodeFrom={nodeFrom}
        handlers={handlers}/>;

    const rows = handlers.getNodesList().map(getTableBodyRow);

    return <tbody>
        {rows}
    </tbody>;
}