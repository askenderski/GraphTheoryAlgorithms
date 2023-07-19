import {articleTypesIterable} from "../../../../Data/ArticleTypes";
import ArticleLinkGroup from "../ArticleLinkGroup/ArticleLinkGroup";
import { IArticle } from "../IArticle";

export default function Articles({articles}: {articles: IArticle[]}) {
    const articleLinkGroups = articleTypesIterable
        .map(articleType =>
            articles.filter(article => article.type === articleType)
        )
        .filter(articlesOfType => articlesOfType.length > 0)
        .map(articlesOfType => {
            return (
                <ArticleLinkGroup articles={articlesOfType}
                type={articlesOfType[0].type} key={articlesOfType[0].type.name} />
            );
        });

    return (
        <>
            {articleLinkGroups}
        </>
    );
};