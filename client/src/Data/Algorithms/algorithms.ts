import {ArticleTypes} from "../ArticleTypes";
import {addNameProperties} from "../../Utilities/enum";

const GeneralAlgorithmTypes = {
    TopSort: {},
};
addNameProperties(GeneralAlgorithmTypes);

const ShortestPathAlgorithmTypes = {
    BellmanFord: {}
};
addNameProperties(ShortestPathAlgorithmTypes);

const EuclideanPathsAndHamiltonCyclesAlgorithmTypes = {
    EuclideanPath: {},
};
addNameProperties(EuclideanPathsAndHamiltonCyclesAlgorithmTypes);

export const AlgorithmTypes = {
    [ArticleTypes.General.name]: GeneralAlgorithmTypes,
    [ArticleTypes.ShortestPath.name]: ShortestPathAlgorithmTypes,
    [ArticleTypes.EuclideanPathsAndHamiltonCycles.name]: EuclideanPathsAndHamiltonCyclesAlgorithmTypes
};
addNameProperties(AlgorithmTypes);