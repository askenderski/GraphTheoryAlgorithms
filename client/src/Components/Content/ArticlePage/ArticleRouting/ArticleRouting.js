import {getOne} from "../../../../Services/articleService";
import Article from "../Article/Article";
import {useEffect, useState} from "react";
import Loading from "../../../Common/Loading/Loading";

function getArticleComponent(article) {
    return <Article title={article.title} description={article.description} type={article.type}/>;
}

export default function ArticleRouting({match}) {
    const [articleExists, setArticleExists] = useState(true);
    const [article, setArticle] = useState(undefined);

    useEffect(() => {
        getOne(match.params.articleId)
            .then(articleResponse => setArticle(articleResponse))
            .catch(err => setArticleExists(false));
    }, []);

    if (articleExists) {
        if (article !== undefined) {
            return getArticleComponent(article);
        } else {
            return <Loading/>;
        }
    } else {
        return <div>Invalid article</div>;
    }
}