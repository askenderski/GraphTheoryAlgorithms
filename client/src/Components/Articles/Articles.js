import {articleTypesIterable} from "../../Data/articleTypes";
import ArticleLinkGroup from "../ArticleLinkGroup/ArticleLinkGroup";
import ArticleLink from "../ArticleLink/ArticleLink";

export default function Articles({articles}) {
    const articleLinkGroups = articleTypesIterable
        .map(articleType =>
            articles.filter(article => article.type === articleType)
        )
        .filter(articlesOfType => articlesOfType.length > 0)
        .map(articlesOfType => {
            const articleChildren = articlesOfType.map(article=><ArticleLink {...article} key={article.title}></ArticleLink>);

            return (
                <ArticleLinkGroup type={articlesOfType[0].type} key={articlesOfType[0].type.name}>
                    {articleChildren}
                </ArticleLinkGroup>
            );
        });

    return (
        <>
            {articleLinkGroups}
        </>
    );
};