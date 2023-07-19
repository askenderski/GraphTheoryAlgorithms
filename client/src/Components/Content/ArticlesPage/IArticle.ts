import { IArticleType } from "Data/ArticleTypes";

export interface IArticle {
    type: IArticleType,
    title: string,
    description: string
}