import {getOne} from "../../../../Services/articleService";
import Article from "../Article/Article";
import {useEffect, useState} from "react";
import Loading from "../../../Common/Loading/Loading";
import { IArticle } from "Components/Content/ArticlesPage/IArticle";

export default function ArticleRouting({match}: {match: {params: {articleType: string, articleTitle: string}}}) {
    const [articleExists, setArticleExists] = useState(true);
    const [article, setArticle] = useState<IArticle | undefined>(undefined);

    useEffect(() => {
        getOne({type: match.params.articleType, title: match.params.articleTitle})
            .then(articleResponse => setArticle(articleResponse))
            .catch(err => setArticleExists(false));
    }, [match.params]);

    if (articleExists) {
        if (article !== undefined) {
            return <Article title={article.title} description={article.description} type={article.type}/>;
        } else {
            return <Loading/>;
        }
    } else {
        return <div>Invalid article</div>;
    }
}