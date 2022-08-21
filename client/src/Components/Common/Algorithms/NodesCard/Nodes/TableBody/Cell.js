function WeightedCellContent({edgeValue, setEdge}) {
    return <input type="number" value={edgeValue} onChange={e => setEdge(e.target.value)}/>;
}

function NonWeightedCellContent({setEdge, edgeValue}) {
    return <input type="checkbox" checked={edgeValue} onChange={e => setEdge(!edgeValue)}/>;
}

export default function Cell({nodeFrom, nodeTo, handlers}) {
    const edgeValue = handlers.getEdgeValue(handlers.getEdge({from: nodeFrom.id, to: nodeTo.id}));

    const CellContentComponent = handlers.getIsWeighted() ? WeightedCellContent : NonWeightedCellContent;

    const setEdge = value=>{
        handlers.setEdge({from: nodeFrom.id, to: nodeTo.id}, value);
    };

    return (
        <td>
            <CellContentComponent setEdge={setEdge} edgeValue={edgeValue}/>
        </td>
    );
}