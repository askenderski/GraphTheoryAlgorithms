import ArticleFilterGroup from "./ArticleFilterGroup/ArticleFilterGroup";
import Articles from "./Articles/Articles";
import {useState} from "react";
import {useFilter} from "../../../Hooks/useFilter";
import {articleTypeNamesIterable} from "../../../Data/articleTypes";
import * as articleService from "../../../Services/articleService";

export default function ArticlesPage() {
    const [elements, setElements] = useState([]);
    const {addFilter, removeFilter} = useFilter({
        defaultFilters: articleTypeNamesIterable
            .reduce((a,b)=>({...a, [b]: true}),{}),
        elements, setElements,
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