import ArticleFilterGroup from "./ArticleFilterGroup/ArticleFilterGroup";
import Articles from "./Articles/Articles";
import {useState} from "react";
import {useFilter} from "../../../Hooks/useFilter";
import {articleTypeNamesIterable} from "../../../Data/ArticleTypes";
import * as articleService from "../../../Services/articleService";

//every article type name will be in this object as true
const allArticleTypesAllowed = articleTypeNamesIterable
    .reduce((a,b)=>({...a, [b]: true}),{});

export default function ArticlesPage() {
    const [elements, setElements] = useState<any[]>([]);
    const {addFilter, removeFilter} = useFilter({
        defaultFilters: allArticleTypesAllowed, elements, setElements,
        filterElementsOfType: (articles, filter) => articles.filter(article=>article.type.name !== filter),
        makeRequest: filters => {
            return articleService.getAll({filters});
        }
    });

    return (
        <>
            <ArticleFilterGroup addFilter={addFilter} removeFilter={removeFilter} />
            <Articles articles={elements}/>
        </>
    );
};