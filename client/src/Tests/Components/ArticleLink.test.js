import ArticleLink from "../../Components/ArticleLink/ArticleLink";
import {render, fireEvent, waitFor, screen, getByText, cleanup} from '@testing-library/react';
import _ from "lodash";

const defaultProps = {
    name: "Default Article Name",
    description: "Default Article Description",
    color: "blue"
};

jest.spyOn(console, "error").mockImplementation(()=>{});

afterEach(cleanup);

describe("ArticleLink visualizes correctly", () => {
    test("Article name is in ArticleLink", () => {
        const name = "Name of the Article";

        const props = _.clone(defaultProps);
        props.name = name;

        const article = render(
            <ArticleLink {...props}></ArticleLink>
        );

        expect(article.getByText(name)).toBeInTheDocument();
    });

    test("Article description beginning is in ArticleLink", () => {
        const description = "Description of the Article" + "a".repeat(10000);

        const props = _.clone(defaultProps);
        props.description = description;

        const article = render(
            <ArticleLink {...props}></ArticleLink>
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
            <ArticleLink {...props}></ArticleLink>
        );

        expect(article.getByTestId("article-description").textContent).not.toContain(textNotToBeVisualized);
    });

    test("ArticleLink applies color", () => {
        const color = "red";

        const props = _.clone(defaultProps);
        props.color = color;

        const articleFilter = render(<ArticleLink {...props}></ArticleLink>);

        expect(articleFilter.getByTestId("article-link")).toHaveStyle({backgroundColor: color});
    });
});

describe("ArticleLink props are validated correctly", () => {
    test("Color of type other than string throws error", () => {
        const color = 3;

        const props = _.clone(defaultProps);
        props.color = color;

        expect(() => render(<ArticleLink {...props}></ArticleLink>)).toThrow("Invalid color");
    });

    test("Invalid color of type string throws error", () => {
        const color = "abc";

        const props = _.clone(defaultProps);
        props.color = color;

        expect(() => render(<ArticleLink {...props}></ArticleLink>)).toThrow("Invalid color");
    });

    test("Description of type other than string throws error", () => {
        const description = 1;

        const props = _.clone(defaultProps);
        props.description = description;

        expect(() => render(<ArticleLink {...props}></ArticleLink>)).toThrow("Invalid description");
    });
});