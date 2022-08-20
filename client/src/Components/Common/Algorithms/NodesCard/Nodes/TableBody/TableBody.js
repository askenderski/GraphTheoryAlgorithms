import { Header } from "../Common";
import Cell from "./Cell";

function VerticalHeader({index}) {
    return <Header index={index}/>;
}

function TableBodyRow({rowIndex, handlers}) {
    const getCell = (_, colIndex) =>
        <Cell key={`${rowIndex} ${colIndex}`} rowIndex={rowIndex} colIndex={colIndex} handlers={handlers}/>;

    const cells = handlers.getNodesList().map(getCell);

    return <tr>
        <VerticalHeader index={rowIndex} />
        {cells}
        </tr>;
}

export function TableBody({handlers}) {
    const getTableBodyRow = (_, rowIndex)=>
        <TableBodyRow key={rowIndex}
        rowIndex={rowIndex} handlers={handlers}/>;

    const rows = handlers.getNodesList().map(getTableBodyRow);

    return <tbody>
        {rows}
    </tbody>;
}