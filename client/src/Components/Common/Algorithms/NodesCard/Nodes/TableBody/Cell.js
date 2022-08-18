function WeightedCellContent({edgeValue, setEdge}) {
    return <input type="number" value={edgeValue} onChange={e => setEdge(e.target.value)}/>;
}

function NonWeightedCellContent({setEdge, edgeValue}) {
    return <input type="checkbox" checked={edgeValue} onChange={e => setEdge(!edgeValue)}/>;
}

export default function Cell({rowIndex, colIndex, nodesRecord, setEdgeByIndex}) {
    const edgeValue = nodesRecord.getEdgeByIndex({to: rowIndex, from: colIndex}).get("value");

    const CellContentComponent = nodesRecord.get("isWeighted") ? WeightedCellContent : NonWeightedCellContent;

    const setEdge = value=>setEdgeByIndex({to: rowIndex, from: colIndex}, {value});

    return (
        <td key={colIndex}>
            <CellContentComponent setEdge={setEdge} edgeValue={edgeValue}/>
        </td>
    );
}