import ArticleLinkGroup from "../../Components/ArticleLinkGroup/ArticleLinkGroup";
import {articleColorsMap, articleTextMap, ArticleTypes} from "../../Data/articleTypes";
import {render} from "@testing-library/react";
import * as _ from "lodash";
import ArticleLink from "../../Components/ArticleLink/ArticleLink";
import {mount} from "enzyme";

const defaultProps = {
    type: ArticleTypes.General
};
const defaultChildren = [];

test("Article renders correct title according to type", () => {
    const props = _.cloneDeep(defaultProps);
    const type = ArticleTypes.ShortestPath;
    props.type = type;

    const articleLinkGroup = render(<ArticleLinkGroup {...props}>{defaultChildren}</ArticleLinkGroup>);

    expect(articleLinkGroup.getByText(articleTextMap.get(type))).toBeInTheDocument();
});

test("Article renders children", () => {
    const children = [
        <ArticleLink type={ArticleTypes.General} name="Name 1" description="Lorem ipsum" key="0"/>,
        <ArticleLink type={ArticleTypes.ShortestPath} name="Name 2" description="Lorem ipsum1" key="1"/>
        ];

    const articleLinkGroup = mount(<ArticleLinkGroup {...defaultProps}>{children}</ArticleLinkGroup>);

    children.forEach(child=>{
        expect(articleLinkGroup.contains(child)).toBe(true);
    });
});

test("Article title is correct color according to type", () => {
    const props = _.cloneDeep(defaultProps);
    const type = ArticleTypes.ShortestPath;
    props.type = type;

    const articleLinkGroup = render(<ArticleLinkGroup {...props}>{defaultChildren}</ArticleLinkGroup>);

    expect(articleLinkGroup.getByTestId("article-link-group")).toHaveStyle(
        {backgroundColor: articleColorsMap.get(type)}
        );
});