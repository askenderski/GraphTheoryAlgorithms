export default function Nodes({nodes, handlers: {setEdgeByIndex, deleteNode} = {}, isDeletingNode}) {
    const {nodeCount} = nodes;

    const horizontalHeaders = [
        <th key="top-left"></th>,
        ...new Array(nodeCount).fill(false).map((_,i)=>getHorizontalHeaderByIndex(i))
    ];

    const horizontalHeaderRow = <thead><tr>{horizontalHeaders}</tr></thead>;

    const rows = <tbody>{new Array(nodeCount).fill(false).map((_, rowIndex)=> getRowByRowIndex(rowIndex))}</tbody>;

    function getHeaderByIndex(index, {children}={}) {
        return (
            <th key={index}>
                {index}
                {children}
            </th>
        );
    }

    function getVerticalHeaderByIndex(index) {
        return getHeaderByIndex(index);
    }

    function getHorizontalHeaderByIndex(index) {
        return getHeaderByIndex(
            index,
            {children:
                    isDeletingNode
                        ? <button data-testid={`delete-${index}`} onClick={() => deleteNode(index)}>X</button>
                        : null
            }
        );
    }

    function getCellByRowAndColIndex(rowIndex, colIndex) {
        return (
            <td key={colIndex}>
                {
                    nodes.get("isWeighted") ?
                        <input type="number" value={nodes.getEdgeByIndex({to: rowIndex, from: colIndex}).get("value")}
                               onChange={e => {
                                   setEdgeByIndex({to: rowIndex, from: colIndex}, {value: e.target.value});
                               }}
                        /> :
                        <input type="checkbox" checked={nodes.getEdgeByIndex({to: rowIndex, from: colIndex}).get("value")}
                               onChange={e => {
                                   setEdgeByIndex({to: rowIndex, from: colIndex}, {value: !nodes.getEdgeByIndex({to: rowIndex, from: colIndex}).get("value")});
                               }}
                        />
                }
            </td>
        );
    }

    function getRowElementsByRowIndex(rowIndex) {
        return (
            <>
                {getVerticalHeaderByIndex(rowIndex)}
                {
                    new Array(nodes.nodeCount).fill(false)
                        .map((_, colIndex) => getCellByRowAndColIndex(rowIndex, colIndex))
                }
            </>
        );
    }

    function getRowByRowIndex(rowIndex) {
        return <tr key={rowIndex}>{getRowElementsByRowIndex(rowIndex)}</tr>;
    }

    return (
        <table>
            {horizontalHeaderRow}
            {rows}
        </table>
    );
}