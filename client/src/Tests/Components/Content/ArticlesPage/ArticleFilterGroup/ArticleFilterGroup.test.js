import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import ArticleFilterGroup from "../../../../../Components/Content/ArticlesPage/ArticleFilterGroup/ArticleFilterGroup";
import {articleTypesIterable, articleColorsMap} from "../../../../../Data/articleTypes";

afterEach(cleanup);

test("All elements appear in Article Filter Group", () => {
    const articleFilterGroup = render(
        <ArticleFilterGroup addFilter={()=>{}} removeFilter={()=>{}} />
    );

    articleTypesIterable.forEach(articleType=>{
        expect(articleFilterGroup.getByText(articleType.name)).toBeInTheDocument();
    });
});

test("All elements appear in Article Filter Group with correct color", () => {
    const articleFilterGroup = render(
        <ArticleFilterGroup addFilter={()=>{}} removeFilter={()=>{}}/>
    );

    articleTypesIterable.forEach(articleType=>{
        expect(articleFilterGroup.getByText(articleType.name)).toHaveStyle({backgroundColor: articleColorsMap.get(articleType)});
    });
});