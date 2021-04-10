import ArticleLink from "../../../../Components/Content/ArticlesPage/ArticleLink/ArticleLink";
import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import _ from "lodash";
import {articleColorsMap, ArticleTypes} from "../../../../Data/articleTypes";
import {MemoryRouter} from "react-router";

const defaultProps = {
    name: "Default Article Name",
    description: "Default Article Description",
    type: ArticleTypes.General
};

jest.spyOn(console, "error").mockImplementation(()=>{});

afterEach(cleanup);

function ArticleLinkInRouter(props) {
    return <MemoryRouter><ArticleLink {...props} /></MemoryRouter>;
}

describe("ArticleLink visualizes correctly", () => {
    test("Article name is in ArticleLink", () => {
        const name = "Name of the Article";

        const props = _.clone(defaultProps);
        props.name = name;

        const article = render(
            <ArticleLinkInRouter {...props}></ArticleLinkInRouter>
        );

        expect(article.getByText(name)).toBeInTheDocument();
    });

    test("Article description beginning is in ArticleLink", () => {
        const description = "Description of the Article" + "a".repeat(10000);

        const props = _.clone(defaultProps);
        props.description = description;

        const article = render(
            <ArticleLinkInRouter {...props}></ArticleLinkInRouter>
        );

        //Only the beginning of the description is guaranteed to be in the Article and so it tests for the first 10 characters
        expect(article.getByTestId("article-description").textContent).toContain(description.slice(0, 10));
    });

    test("Article description end is not in ArticleLink when the description is longer than 100 characters", () => {
        const textNotToBeVisualized = "This text will not be visualized.";
        const description = "a".repeat(10000) + textNotToBeVisualized;

        const props = _.clone(defaultProps);
        props.description = description;

        const article = render(
            <ArticleLinkInRouter {...props}></ArticleLinkInRouter>
        );

        expect(article.getByTestId("article-description").textContent).not.toContain(textNotToBeVisualized);
    });

    test("ArticleLink applies color", () => {
        const type = ArticleTypes.ShortestPath;

        const props = _.clone(defaultProps);
        props.type = type;

        const articleFilter = render(<ArticleLinkInRouter {...props}></ArticleLinkInRouter>);

        expect(articleFilter.getByTestId("article-link"))
            .toHaveStyle({backgroundColor: articleColorsMap.get(type)});
    });
});

describe("ArticleLink props are validated correctly", () => {
    test("Invalid type throws error", () => {
        const invalidType = {};

        const props = _.clone(defaultProps);
        props.type = invalidType;

        expect(() => render(<ArticleLinkInRouter {...props}></ArticleLinkInRouter>)).toThrow("Invalid type");
    });

    test("Description of type other than string throws error", () => {
        const description = 1;

        const props = _.clone(defaultProps);
        props.description = description;

        expect(() => render(<ArticleLinkInRouter {...props}></ArticleLinkInRouter>)).toThrow("Invalid description");
    });
});