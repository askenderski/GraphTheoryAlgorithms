import ArticleFilterGroup from "../ArticleFilterGroup/ArticleFilterGroup";
import Articles from "../Articles/Articles";

export default function ArticlePage() {
    return (
        <>
            <ArticleFilterGroup/>
            <Articles articles={[]}/>
        </>
    );
};