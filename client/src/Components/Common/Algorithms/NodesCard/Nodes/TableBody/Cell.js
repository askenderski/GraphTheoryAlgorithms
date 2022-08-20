function WeightedCellContent({edgeValue, setEdge}) {
    return <input type="number" value={edgeValue} onChange={e => setEdge(e.target.value)}/>;
}

function NonWeightedCellContent({setEdge, edgeValue}) {
    return <input type="checkbox" checked={edgeValue} onChange={e => setEdge(!edgeValue)}/>;
}

export default function Cell({rowIndex, getEdgeByIndex, getEdgeValue, getIsWeighted, colIndex, setEdgeByIndex}) {
    const edgeValue = getEdgeValue(getEdgeByIndex({to: rowIndex, from: colIndex}));

    const CellContentComponent = getIsWeighted() ? WeightedCellContent : NonWeightedCellContent;

    const setEdge = value=>setEdgeByIndex({to: rowIndex, from: colIndex}, {value});

    return (
        <td key={colIndex}>
            <CellContentComponent setEdge={setEdge} edgeValue={edgeValue}/>
        </td>
    );
}