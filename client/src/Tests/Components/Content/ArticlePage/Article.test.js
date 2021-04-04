import Article from "../../../../Components/Content/ArticlePage/Article/Article";
import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import _ from "lodash";
import {articleColorsMap, articleTextMap, ArticleTypes} from "../../../../Data/articleTypes";
import ArticleFilter from "../../../../Components/Content/ArticlesPage/ArticleFilterGroup/ArticleFilter/ArticleFilter";

const defaultProps = {
    title: "Default title",
    description: "Default description",
    type: ArticleTypes.General
};

jest.spyOn(console, "error").mockImplementation(()=>{});

afterEach(cleanup);

describe("Article has correct content", () => {
    test("Article contains correct title", () => {
        const title = "Title to be found";

        const props = _.clone(defaultProps);
        props.title = title;

        const articleFilter = render(
            <Article {...props}>
            </Article>
        );

        expect(articleFilter.getByText(title)).toBeInTheDocument();
    });

    test("Article contains correct description", () => {
        const description = "Description to be found";

        const props = _.clone(defaultProps);
        props.description = description;

        const articleFilter = render(
            <Article {...props}>
            </Article>
        );

        expect(articleFilter.getByText(description)).toBeInTheDocument();
    });

    test("Article contains type", () => {
        const type = ArticleTypes.ShortestPath;

        const props = _.clone(defaultProps);
        props.type = type;

        const articleFilter = render(
            <Article {...props}>
            </Article>
        );

        expect(articleFilter.getByText(articleTextMap.get(type))).toBeInTheDocument();
    });

    test("Article applies correct color", () => {
        const type = ArticleTypes.ShortestPath;

        const props = _.clone(defaultProps);
        props.type = type;

        const articleFilter = render(<Article {...props}></Article>);

        expect(articleFilter.getByText(articleTextMap.get(type))).toHaveStyle({backgroundColor: articleColorsMap.get(type)});
    });
});

describe("Article deals with invalid props correctly", () => {
    test("Article with empty description throws error", () => {
        const description = "";

        const props = _.clone(defaultProps);
        props.description = description;

        const renderArticleFilter = () => render(<Article {...props}></Article>);

        expect(renderArticleFilter).toThrowError("Invalid description");
    });

    test("Article with description of type different than string throws error", () => {
        const description = undefined;

        const props = _.clone(defaultProps);
        props.description = description;

        const renderArticleFilter = () => render(<Article {...props}></Article>);

        expect(renderArticleFilter).toThrowError("Invalid description");
    });

    test("Article with empty title throws error", () => {
        const title = "";

        const props = _.clone(defaultProps);
        props.title = title;

        const renderArticleFilter = () => render(<Article {...props}></Article>);

        expect(renderArticleFilter).toThrowError("Invalid title");
    });

    test("Article with title of type different than string throws error", () => {
        const title = undefined;

        const props = _.clone(defaultProps);
        props.description = title;

        const renderArticleFilter = () => render(<Article {...props}></Article>);

        expect(renderArticleFilter).toThrowError("Invalid description");
    });

    test("Article with invalid type throws error", () => {
        const type = {};

        const props = _.clone(defaultProps);
        props.type = type;

        const renderArticleFilter = () => render(<Article {...props}></Article>);

        expect(renderArticleFilter).toThrowError("Invalid type");
    });
});