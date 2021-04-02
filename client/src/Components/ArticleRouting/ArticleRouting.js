import {getOne} from "../../Services/articleService";
import Article from "../Article/Article";
import {useEffect, useState} from "react";
import Loading from "../Loading/Loading";

function getArticleComponent(article) {
    return <Article title={article.title} description={article.description} type={article.type}/>;
}

export default function ArticleRouting({match}) {
    const [article, setArticle] = useState(undefined);

    useEffect(() => {
        getOne(match.params.articleId)
            .then(articleResponse => setArticle(articleResponse));
    }, []);

    return (
        article !== undefined ? getArticleComponent(article) : <Loading />
    );
}