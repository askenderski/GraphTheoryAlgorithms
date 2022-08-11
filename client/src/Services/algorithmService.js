import {graphs, defaultOptions, getMakeSureIsOkWithStream} from "./common";
import {ArticleTypes} from "../Data/ArticleTypes";

export const getOneByTypeAndTitle = async function (algorithmType, algorithmTitle) {
    return fetch(`${graphs.base}/${algorithmType}/${algorithmTitle}`, defaultOptions)
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}));
}

export const getOneById = async function (graphId) {
    return fetch(`${graphs.base}/${graphId}`, defaultOptions)
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}))
        .then(graph => ({...graph, type: ArticleTypes[graph.type]}));
}