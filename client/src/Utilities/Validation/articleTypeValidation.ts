import {IArticleType, articleTypesSet} from "../../Data/ArticleTypes";

export const validateArticleType = function (type: IArticleType, {errorType = Error, message="Invalid type"} = {}) {
    if (!articleTypesSet.has(type)) {
        throw new errorType(message);
    }
}