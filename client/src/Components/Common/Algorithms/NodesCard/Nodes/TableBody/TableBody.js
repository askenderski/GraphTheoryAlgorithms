import { Header } from "../Common";
import Cell from "./Cell";

function VerticalHeader({index}) {
    return <Header index={index}/>;
}

function TableBodyRow({rowIndex, nodeCount, nodesRecord, setEdgeByIndex}) {
    const getCell = (_, colIndex) => <Cell key={`${rowIndex} ${colIndex}`} rowIndex={rowIndex} colIndex={colIndex}
        nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex} />;

    const cells = new Array(nodeCount).fill(false).map(getCell);

    return <tr>
        <VerticalHeader index={rowIndex} />
        {cells}
        </tr>;
}

export function TableBody({nodeCount, nodesRecord, setEdgeByIndex}) {
    const getTableBodyRow = (_, rowIndex)=>
        <TableBodyRow key={rowIndex}
        rowIndex={rowIndex} nodeCount={nodeCount}
        nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex} />;

    const emptyIterableArray = new Array(nodeCount).fill(false);
    const rows = emptyIterableArray.map(getTableBodyRow);

    return <tbody>
        {rows}
    </tbody>;
}