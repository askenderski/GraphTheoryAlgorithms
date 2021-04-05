export default function Nodes({nodes, handlers: {setNode, deleteNode} = {}, isDeletingNode}) {
    const {nodeCount} = nodes;

    const horizontalHeaders = [
        <th key="top-left"></th>,
        ...new Array(nodeCount).fill(false).map((_,i)=>getHorizontalHeaderByIndex(i))
    ];

    const horizontalHeaderRow = <tr>{horizontalHeaders}</tr>;

    const rows = new Array(nodeCount).fill(false).map((_, rowIndex)=> getRowByRowIndex(rowIndex));

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
                <input type="text" value={nodes.getNode({i: rowIndex, j: colIndex})}
                onChange={e=>{
                    setNode({i: rowIndex, j: colIndex}, e.target.value);
                }}/>
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