import {graphs, defaultOptions, getMakeSureIsOkWithStream} from "./common";

export const getOne = async function (algorithmType, algorithmTitle) {
    return fetch(`${graphs.base}/${algorithmType}/${algorithmTitle}`, defaultOptions)
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}));
}