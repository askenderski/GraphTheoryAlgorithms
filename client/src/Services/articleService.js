import {ArticleTypes} from "../Data/articleTypes";
import {articles, getMakeSureIsOkWithStream} from "./common";

export const getOne = async function (id) {
    return {title: "asdsa", description: "adsaddsdas sas dsa", type: ArticleTypes.General};
};

export const getAll = function ({filters}) {
    const filterParams = Object.entries(filters)
        .filter(([filterName, isToBeIncluded]) => isToBeIncluded)
        .reduce((a, [filterName, isToBeIncluded]) => ({...a, [filterName]: isToBeIncluded}), {});
    
    return fetch(`${articles.base}`, {
        method: 'GET',
        headers: {
            filters: filterParams
        }
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}))
        .then(articles => {
            return articles.map(article=>{
                return {...article, type: ArticleTypes[article.type]};
            });
        });
}