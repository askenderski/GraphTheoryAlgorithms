import { INodesHandlers } from "Hooks/IHandlers";
import { ReactElement } from "react";
import { INodeRecord } from "Records/NodeRecord/NodeRecord";

interface CellContent<T> {
    (arg: {edgeValue: T, setEdge: (arg: T)=>void}) : ReactElement
}

const WeightedCellContent: CellContent<number> = function({edgeValue, setEdge}) {
    return <input type="number" value={edgeValue} onChange={e => setEdge(Number(e.target.value))}/>;
}

const NonWeightedCellContent: CellContent<boolean> = function ({setEdge, edgeValue}) {
    return <input type="checkbox" checked={edgeValue} onChange={e => setEdge(!edgeValue)}/>;
}

export default function Cell(
    {nodeFrom, nodeTo, handlers}: {nodeFrom: INodeRecord, nodeTo: INodeRecord, handlers: INodesHandlers}
) {
    const edgeValue = handlers.getEdgeValue(handlers.getEdge({from: nodeFrom.get("id"), to: nodeTo.get("id")}));

    const CellContentComponent: CellContent<any> = handlers.getIsWeighted() ? WeightedCellContent : NonWeightedCellContent;

    const setEdge = (value: string | boolean)=>{
        handlers.setEdge({from: nodeFrom.get("id"), to: nodeTo.get("id")}, value);
    };

    return (
        <td>
            <CellContentComponent setEdge={setEdge} edgeValue={edgeValue}/>
        </td>
    );
}