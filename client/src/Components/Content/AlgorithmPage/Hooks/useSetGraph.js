import {NodesRecordFromGraphObject} from "../../../../Records/NodesRecord/NodesRecord";
import {getOneById} from "../../../../Services/algorithmService";
import { useEffect } from "react";

export default function useSetGraph(graphId, {setNodes, setDoesGraphExist}) {
    useEffect(() => {
        getOneById(graphId)
            .then(graph=>{
                setNodes(NodesRecordFromGraphObject(graph));
            })
            .catch(err=>{
                setDoesGraphExist(false);
            });
    }, [graphId]);
}