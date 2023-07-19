import {IArticleType, articleColorsMap, articleTextMap} from "../../../../Data/ArticleTypes";
import ArticleLink from "../ArticleLink/ArticleLink";
import { Routes } from "../../../../Data/Routes/routes";
import { IArticle } from "../IArticle";

interface IArticleLinkGroupProps extends React.PropsWithChildren {
    articles: IArticle[],
    type: IArticleType
}

export default function ArticleLinkGroup(props: IArticleLinkGroupProps) {
    return (
        <div>
            <span data-testid="article-link-group" style={{backgroundColor: articleColorsMap.get(props.type)}}>
                {articleTextMap.get(props.type)}
            </span>
            {props.articles.map(article=>
                <ArticleLink
                    to={Routes.articles.article.fullPath
                        .replace(":articleType", article.type.name)
                        .replace(":articleTitle", article.title)
                    }
                    {...article} key={article.title}></ArticleLink>)}
        </div>
    );
};