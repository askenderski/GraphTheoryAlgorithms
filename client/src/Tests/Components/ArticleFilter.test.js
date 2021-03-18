import ArticleFilter from "../../Components/ArticleFilter";
import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';

const defaultContent = {
    textContent: "Some content",
    color: "blue"
};

afterEach(cleanup);

describe("Article filter has correct content", () => {
    test("Article filter contains correct text content", () => {
        const articleFilterTextContent = "Some filter";

        const articleFilter = render(
            <ArticleFilter
                content={articleFilterTextContent}
                color={defaultContent.color}>
            </ArticleFilter>);

        expect(articleFilter.getByText(articleFilterTextContent)).toBeInTheDocument();
    });

    test("Article filter applies color", () => {
        const articleFilter = render(
            <ArticleFilter
                content={defaultContent.textContent}
                color="blue">
            </ArticleFilter>);

        expect(articleFilter.getByTestId('with-backgroundColor')).toHaveStyle({backgroundColor: "blue"});
    });
});

describe("Article filter deals with invalid information correctly", () => {
    test("Article without content throws error", () => {
        const renderArticleFilter = () => render(<ArticleFilter color={defaultContent.color}></ArticleFilter>);

        expect(renderArticleFilter).toThrowError("Invalid text content");
    });

    test("Article with content of type different than string throws error", () => {
        const renderArticleFilter = () => render(<ArticleFilter content={1} color={defaultContent.color}></ArticleFilter>);

        expect(renderArticleFilter).toThrowError("Invalid text content");
    });

    test("Article with empty string content throws error", () => {
        const renderArticleFilter = () => render(<ArticleFilter content="" color={defaultContent.color}></ArticleFilter>);

        expect(renderArticleFilter).toThrowError("Invalid text content");
    });

    test("Article without color throws error", () => {
        const renderArticleFilter = () => render(<ArticleFilter content={defaultContent.textContent}></ArticleFilter>);

        expect(renderArticleFilter).toThrowError("Invalid color");
    });

    test("Article with color of type different than string throws error", () => {
        const renderArticleFilter = () => render(<ArticleFilter content={defaultContent.color} color={1}></ArticleFilter>);

        expect(renderArticleFilter).toThrowError("Invalid color");
    });

    test("Article with invalid string color throws error", () => {
        const renderArticleFilter = () => render(<ArticleFilter content={defaultContent.color} color="foo"></ArticleFilter>);

        expect(renderArticleFilter).toThrowError("Invalid color");
    });
});