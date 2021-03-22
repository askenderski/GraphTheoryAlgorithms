import {articleTypesSet} from "../../Data/articleTypes";

export const validateArticleType = function (type, {errorType = Error, message="Invalid type"} = {}) {
    if (!articleTypesSet.has(type)) {
        throw new errorType(message);
    }
}