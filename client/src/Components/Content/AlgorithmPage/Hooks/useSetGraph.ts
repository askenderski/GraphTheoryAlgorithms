import {INodesRecord, getNodesRecordFromGraphObject} from "../../../../Records/NodesRecord/NodesRecord";
import {getOneById} from "../../../../Services/algorithmService";
import { useEffect } from "react";

export default function useSetGraph(
    graphId: string,
    {setNodesRecord, setDoesGraphExist}:
        {setNodesRecord: (arg:INodesRecord)=>void, setDoesGraphExist:(arg:boolean)=>void}
) {
    useEffect(() => {
        getOneById(graphId)
            .then(graph=>{
                setNodesRecord(getNodesRecordFromGraphObject(graph));
            })
            .catch(err=>{
                setDoesGraphExist(false);
            });
    }, [graphId]);
}