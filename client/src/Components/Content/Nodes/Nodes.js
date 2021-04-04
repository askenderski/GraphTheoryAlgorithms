export default function Nodes({nodes}) {
    const {nodeCount} = nodes;

    const horizontalHeaders = new Array(nodeCount).fill(false).map((_,i)=>getHeaderByIndex(i));
    const horizontalHeaderRow = <tr>{horizontalHeaders}</tr>;

    const rows = new Array(nodeCount).fill(false).map((_, rowIndex)=> getRowByRowIndex(rowIndex));

    function getHeaderByIndex(rowIndex) {
        return <th key={rowIndex}>{rowIndex}</th>;

    }

    function getCellByRowAndColIndex(rowIndex, colIndex) {
        return (
            <td key={colIndex}>
                <input type="text" value={nodes.get({i: rowIndex, j: colIndex})}
                onChange={e=>{
                    nodes.set({i: rowIndex, j: colIndex}, e.target.value);
                }}/>
            </td>
        );
    }

    function getRowElementsByRowIndex(rowIndex) {
        return (
            <>
                {getHeaderByIndex(rowIndex)}
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