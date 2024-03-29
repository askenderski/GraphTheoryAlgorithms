import {addNameProperties} from "../Utilities/enum";

const initialArticleTypes = {
    General: {},
    ShortestPath: {},
    EuclideanPathsAndHamiltonCycles: {},
};

addNameProperties(initialArticleTypes);

interface IArticleTypes {
    [key: string]: IArticleType
}

export interface IArticleType {
    name: string
}

export const ArticleTypes = initialArticleTypes as unknown as IArticleTypes;

export const articleTypesIterable = Object.values(ArticleTypes);
export const articleTypeNamesIterable = articleTypesIterable.map(articleType => articleType.name);
export const articleTypesSet = new Set(articleTypesIterable);

const ArticleColorsMapToExport = new Map();
ArticleColorsMapToExport.set(ArticleTypes.General, "red");
ArticleColorsMapToExport.set(ArticleTypes.ShortestPath, "blue");
ArticleColorsMapToExport.set(ArticleTypes.EuclideanPathsAndHamiltonCycles, "green");

export const articleColorsMap = ArticleColorsMapToExport;

const ArticleTextMapToExport = new Map();
ArticleTextMapToExport.set(ArticleTypes.General, "General algorithms");
ArticleTextMapToExport.set(ArticleTypes.ShortestPath, "Shortest path algorithms");
ArticleTextMapToExport.set(ArticleTypes.EuclideanPathsAndHamiltonCycles, "Euclidean-path and Hamilton-cycle finding algorithms");

export const articleTextMap = ArticleTextMapToExport;