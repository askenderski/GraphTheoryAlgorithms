import ArticleFilter from "../../Components/ArticleFilter/ArticleFilter";
import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';

const defaultContent = {
    textContent: "Some content",
    color: "blue"
};

jest.spyOn(console, "error").mockImplementation(()=>{});

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

        expect(articleFilter.getByTestId('with-background-color')).toHaveStyle({backgroundColor: "blue"});
    });
});

describe("Article filter toggles when clicked", () => {
    test("Article filter changes color when clicked once", () => {
        const articleFilter = render(
            <ArticleFilter
                content={defaultContent.textContent}
                color={defaultContent.color}>
            </ArticleFilter>);

        fireEvent.click(articleFilter.getByText(defaultContent.textContent));

        expect(articleFilter.getByTestId('with-background-color').classList.contains("inactive-article-filter")).toBe(true);
    });

    test("Article filter reverts to no change in color when clicked twice", () => {
        const articleFilter = render(
            <ArticleFilter
                content={defaultContent.textContent}
                color={defaultContent.color}>
            </ArticleFilter>);

        fireEvent.click(articleFilter.getByText(defaultContent.textContent));
        fireEvent.click(articleFilter.getByText(defaultContent.textContent));

        //The inactive-article-filter class was added when the element was clicked and is supposed to no longer be active now
        //that the event has been clicked again
        expect(articleFilter.getByTestId('with-background-color').classList.contains("inactive-article-filter")).toBe(false);
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