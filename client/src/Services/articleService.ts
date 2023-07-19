import {ArticleTypes} from "../Data/ArticleTypes";
import {articles, defaultOptions, getMakeSureIsOkWithStream} from "./common";

export const getOne = async function ({title, type}: {title: string, type: string}) {
    return fetch(`${articles.base}/${type}/${title}`, defaultOptions)
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}))
        .then(article => {
            return {...article, type: ArticleTypes[article.type]};
        });
};

export const getAll = function ({filters}: {filters: {[key: string]: boolean}}) {
    const filterParams = Object.entries(filters)
        .filter(([filterName, isToBeIncluded]) => isToBeIncluded)
        .reduce((a, [filterName, isToBeIncluded]) => ({...a, [filterName]: isToBeIncluded}), {});
    
    return fetch(`${articles.base}`, {
        ...defaultOptions,
        method: 'GET',
        headers: {
            filters: filterParams
        } as unknown as HeadersInit
    })
        .then(getMakeSureIsOkWithStream({allowedStatuses: [200]}))
        .then(articles => {
            return articles.map((article: {[key: string]: any})=>{
                return {...article, type: ArticleTypes[article.type]};
            });
        });
}