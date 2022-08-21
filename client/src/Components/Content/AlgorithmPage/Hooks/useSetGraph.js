import {getNodesRecordFromGraphObject} from "../../../../Records/NodesRecord/NodesRecord";
import {getOneById} from "../../../../Services/algorithmService";
import { useEffect } from "react";

export default function useSetGraph(graphId, {setNodesRecord, setDoesGraphExist}) {
    useEffect(() => {
        getOneById(graphId)
            .then(graph=>{
                setNodesRecord(getNodesRecordFromGraphObject(graph));
            })
            .catch(err=>{
                console.log(err);
                setDoesGraphExist(false);
            });
    }, [graphId]);
}