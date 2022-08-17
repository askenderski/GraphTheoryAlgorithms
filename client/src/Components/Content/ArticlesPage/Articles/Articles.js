import {articleTypesIterable} from "../../../../Data/ArticleTypes";
import ArticleLinkGroup from "../ArticleLinkGroup/ArticleLinkGroup";
import ArticleLink from "../ArticleLink/ArticleLink";
import {Routes} from "../../../../Data/Routes/routes";

export default function Articles({articles}) {
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