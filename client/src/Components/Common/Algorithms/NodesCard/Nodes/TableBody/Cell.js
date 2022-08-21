function WeightedCellContent({edgeValue, setEdge}) {
    return <input type="number" value={edgeValue} onChange={e => setEdge(e.target.value)}/>;
}

function NonWeightedCellContent({setEdge, edgeValue}) {
    return <input type="checkbox" checked={edgeValue} onChange={e => setEdge(!edgeValue)}/>;
}

export default function Cell({rowIndex, colIndex, handlers}) {
    const edgeValue = handlers.getEdgeValue(handlers.getEdgeByIndex({from: rowIndex, to: colIndex}));

    const CellContentComponent = handlers.getIsWeighted() ? WeightedCellContent : NonWeightedCellContent;

    const setEdge = value=>handlers.setEdgeByIndex({from: rowIndex, to: colIndex}, {value});

    return (
        <td key={colIndex}>
            <CellContentComponent setEdge={setEdge} edgeValue={edgeValue}/>
        </td>
    );
}