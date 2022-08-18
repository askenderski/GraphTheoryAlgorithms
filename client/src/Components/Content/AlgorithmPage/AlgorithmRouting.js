import React, {useState, useMemo, Suspense} from "react";
import {NodesRecord} from "../../../Records/NodesRecord/NodesRecord";
import useSetGraph from "./Hooks/useSetGraph";
import Loading from "../../Common/Loading/Loading";

export default function AlgorithmRouting({match: {params}}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    const [nodesRecord, setNodesRecord] = useState(NodesRecord());
    const [doesGraphExist, setDoesGraphExist] = useState(true);
    const [doesAlgorithmExist, setDoesAlgorithmExist] = useState(true);

    useSetGraph(graphId, {setDoesGraphExist, setNodesRecord});

    const AlgorithmComponent = useMemo(()=>React.lazy(
        ()=>import(`../Algorithms/${algorithmType}/${algorithmTitle}`)
            .catch(err=>{
                setDoesAlgorithmExist(false);
                return {default: Loading};
            })
    ), []);

    if (doesGraphExist && doesAlgorithmExist) {
        return (
        <Suspense fallback={<Loading />}>
            <AlgorithmComponent nodesRecord={nodesRecord} setNodesRecord={setNodesRecord}/>
        </Suspense>
        );
    }

    return null;
};