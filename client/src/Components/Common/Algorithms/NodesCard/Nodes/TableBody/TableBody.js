import { Header } from "../Common";
import Cell from "./Cell";

function VerticalHeader({index}) {
    return <Header index={index}/>;
}

function TableBodyRow({rowIndex, nodeCount, nodesRecord, getEdgeValue, getIsWeighted, getEdgeByIndex, setEdgeByIndex}) {
    const getCell = (_, colIndex) => <Cell key={`${rowIndex} ${colIndex}`} rowIndex={rowIndex} colIndex={colIndex}
        getEdgeByIndex={getEdgeByIndex} getIsWeighted={getIsWeighted}
        setEdgeByIndex={setEdgeByIndex} getEdgeValue={getEdgeValue}/>;

    const cells = new Array(nodeCount).fill(false).map(getCell);

    return <tr>
        <VerticalHeader index={rowIndex} />
        {cells}
        </tr>;
}

export function TableBody({nodeCount, nodesRecord, handlers}) {
    const {setEdgeByIndex} = handlers;

    const getTableBodyRow = (_, rowIndex)=>
        <TableBodyRow key={rowIndex}
        rowIndex={rowIndex} nodeCount={nodeCount}
        nodesRecord={nodesRecord} getIsWeighted={handlers.getIsWeighted} getEdgeByIndex={handlers.getEdgeByIndex}
        setEdgeByIndex={setEdgeByIndex} getEdgeValue={handlers.getEdgeValue}/>;

    const emptyIterableArray = new Array(nodeCount).fill(false);
    const rows = emptyIterableArray.map(getTableBodyRow);

    return <tbody>
        {rows}
    </tbody>;
}