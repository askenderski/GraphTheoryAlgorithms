function Header({index, children}) {
    return (
        <th key={index}>
            {index}
            {children}
        </th>
    );
}

function VerticalHeader({index}) {
    return <Header index={index}/>;
}

export default function Nodes({nodes: nodesRecord, handlers: {setEdgeByIndex, deleteNode} = {}, isDeletingNode}) {
    const {nodeCount} = nodesRecord;

    return (
        <table>
            <TableHead nodeCount={nodeCount} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
            <TableBody nodeCount={nodeCount} nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex}/>
        </table>
    );
}

function WeightedCellContent({edgeValue, setEdge}) {
    return <input type="number" value={edgeValue} onChange={e => setEdge(e.target.value)}/>;
}

function NonWeightedCellContent({setEdge, edgeValue}) {
    return <input type="checkbox" checked={edgeValue} onChange={e => setEdge(!edgeValue)}/>;
}

function Cell({rowIndex, colIndex, nodesRecord, setEdgeByIndex}) {
    const edgeValue = nodesRecord.getEdgeByIndex({to: rowIndex, from: colIndex}).get("value");

    const CellContentComponent = nodesRecord.get("isWeighted") ? WeightedCellContent : NonWeightedCellContent;

    return (
        <td key={colIndex}>
            {
                <CellContentComponent
                setEdge={value=>setEdgeByIndex({to: rowIndex, from: colIndex}, {value})}
                nodesRecord={nodesRecord} edgeValue={edgeValue}/>
            }
        </td>
    );
}

function TableBodyRow({rowIndex, nodeCount, nodesRecord, setEdgeByIndex}) {
    const getCell = (_, colIndex) => <Cell rowIndex={rowIndex} colIndex={colIndex}
        nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex} />;

    const cells = new Array(nodeCount).fill(false).map(getCell);

    return <tr key={rowIndex}>
        <VerticalHeader index={rowIndex} />
        {cells}
        </tr>;
}

function TableBody({nodeCount, nodesRecord, setEdgeByIndex}) {
    const getTableBodyRow = (_, rowIndex)=>
        <TableBodyRow
        rowIndex={rowIndex} nodeCount={nodeCount}
        nodesRecord={nodesRecord} setEdgeByIndex={setEdgeByIndex} />;

    const emptyIterableArray = new Array(nodeCount).fill(false);
    const rows = emptyIterableArray.map(getTableBodyRow);

    return <tbody>
        {rows}
    </tbody>;
}

function NodeDeleteButton({index, deleteNode}) {
    return <button data-testid={`delete-${index}`} onClick={() => deleteNode(index)}>X</button>
}

function NodeDeleteButtonContainer({index, deleteNode, isDeletingNode}) {
    if (isDeletingNode) {
        return <NodeDeleteButton index={index} deleteNode={deleteNode} />;
    }
    
    return null;
}

function HorizontalHeader({index, isDeletingNode, deleteNode}) {
    return <Header index={index}>
            <NodeDeleteButtonContainer index={index} isDeletingNode={isDeletingNode} deleteNode={deleteNode}/>
        </Header>;
}

function HorizontalVerticalHeader() {
    return <th key="top-left" />;
}

function TableHead({nodeCount, isDeletingNode, deleteNode}) {
    const iterableNodeHeaderArray = new Array(nodeCount).fill(false);
    const nodeHeaders = iterableNodeHeaderArray.map((_,i)=>
        <HorizontalHeader index={i} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
    );

    const horizontalHeaders = [
        <HorizontalVerticalHeader />,
        ...nodeHeaders
    ];

    return <thead><tr>{horizontalHeaders}</tr></thead>;
}