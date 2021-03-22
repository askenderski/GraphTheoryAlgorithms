import {addNameProperties} from "../Utilities/enum";

export const ArticleTypes = {
    General: {},
    ShortestPath: {},
    EuclideanPathsAndHamiltonCycles: {},
};

addNameProperties(ArticleTypes);

export const articleTypesIterable = Object.values(ArticleTypes);
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