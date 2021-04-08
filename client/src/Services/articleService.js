import {ArticleTypes} from "../Data/articleTypes";
import {articles, getMakeSureIsOk} from "./common";

export const getOne = async function (id) {
    return {title: "asdsa", description: "adsaddsdas sas dsa", type: ArticleTypes.General};
};

export const getAll = function () {
    return fetch(articles.base)
        .then(getMakeSureIsOk({allowedStatuses: [200]}));
}