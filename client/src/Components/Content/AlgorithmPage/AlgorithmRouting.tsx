import React, {useState, useMemo, Suspense} from "react";
import {INodesRecord} from "../../../Records/NodesRecord/NodesRecord";
import useSetGraph from "./Hooks/useSetGraph";
import Loading from "../../Common/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { selectNodesRecord } from "Store/algorithm/reducer";
import { algorithmActions } from "../../../Store/store";

const {setNodesRecord: setNodesRecordAction} = algorithmActions;

interface IMatch {
    params: {
        algorithmType: string,
        algorithmTitle: string,
        graphId: string
    }
}

export default function AlgorithmRouting({match: {params}}: {match: IMatch}) {
    const { algorithmType, algorithmTitle, graphId } = params;
    
    const dispatch = useDispatch();

    const nodesRecord = useSelector(selectNodesRecord);
    const setNodesRecord = (nodesRecord: INodesRecord) => dispatch(setNodesRecordAction(nodesRecord));
    
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