import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../Common/Loading/Loading";
import {getOne} from "../../../Services/algorithmService";

export default function DefaultAlgorithmRouting({routeToRedirectTo, match: {params}}) {
    const [graphId, setGraphId] = useState();
    const [doesArticleExist, setDoesArticleExist] = useState(true);

    useEffect(()=>{
        getOne(params.algorithmTypeId, params.algorithmId)
            .then(graph=>{
                setGraphId(graph.id);
            })
            .catch(err=>setDoesArticleExist(false));
    }, []);

    if (!doesArticleExist) {
        return <div>Error in loading algorithm</div>;
    }

    if (graphId !== undefined) {
        return <Redirect to={
            routeToRedirectTo
                .replace(":algorithmTypeId", params.algorithmTypeId)
                .replace(":algorithmId", params.algorithmId)
                .replace(":graphId", graphId)
        }/>;
    } else {
        return <Loading/>;
    }
};