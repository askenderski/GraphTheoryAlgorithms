import {addNameProperties} from "../Utilities/enum";

export const ArticleTypes = {
    General: {},
    ShortestPath: {},
    EuclideanPathsAndHamiltonCycles: {},
};

addNameProperties(ArticleTypes);

export const articleTypesIterable = Object.values(ArticleTypes);

const ArticleColorsMapToExport = new Map();
ArticleColorsMapToExport.set(ArticleTypes.General, "red");
ArticleColorsMapToExport.set(ArticleTypes.ShortestPath, "blue");
ArticleColorsMapToExport.set(ArticleTypes.EuclideanPathsAndHamiltonCycles, "green");

export const articleColorsMap = ArticleColorsMapToExport;