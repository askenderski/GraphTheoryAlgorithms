import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../Common/Loading/Loading";
import {getOneByTypeAndTitle} from "../../../Services/algorithmService";

export default function DefaultAlgorithmRouting({routeToRedirectTo, match: {params}}) {
    const [graphId, setGraphId] = useState();
    const [doesArticleExist, setDoesArticleExist] = useState(true);

    useEffect(()=>{
        getOneByTypeAndTitle(params.algorithmType, params.algorithmTitle)
            .then(graph=>{
                setGraphId(graph._id);
            })
            .catch(err=>setDoesArticleExist(false));
    }, [params]);

    if (!doesArticleExist) {
        return <div>Error in loading algorithm</div>;
    }

    if (graphId !== undefined) {
        return <Redirect to={
            routeToRedirectTo
                .replace(":algorithmType", params.algorithmType)
                .replace(":algorithmTitle", params.algorithmTitle)
                .replace(":graphId", graphId)
        }/>;
    } else {
        return <Loading/>;
    }
};