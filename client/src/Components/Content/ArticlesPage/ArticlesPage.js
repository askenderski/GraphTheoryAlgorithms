import ArticleFilterGroup from "./ArticleFilterGroup/ArticleFilterGroup";
import Articles from "./Articles/Articles";

export default function ArticlesPage() {
    return (
        <>
            <ArticleFilterGroup/>
            <Articles articles={[]}/>
        </>
    );
};