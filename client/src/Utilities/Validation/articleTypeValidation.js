import {articleTypesSet} from "../../Data/ArticleTypes";

export const validateArticleType = function (type, {errorType = Error, message="Invalid type"} = {}) {
    if (!articleTypesSet.has(type)) {
        throw new errorType(message);
    }
}