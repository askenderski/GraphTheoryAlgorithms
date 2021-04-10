import Articles from "../../../../Components/Content/ArticlesPage/Articles/Articles";
import ArticleLink from "../../../../Components/Content/ArticlesPage/ArticleLink/ArticleLink";
import {mount} from "enzyme";
import ArticleLinkGroup from "../../../../Components/Content/ArticlesPage/ArticleLinkGroup/ArticleLinkGroup";
import {ArticleTypes} from "../../../../Data/articleTypes";
import {MemoryRouter} from "react-router";

function isArticleLinkFromArticle(articleLink, article) {
    const typeIsSame = articleLink.prop("type") === article.type;
    const titleIsSame = articleLink.prop("title") === article.title;
    const descriptionIsSame = articleLink.prop("description") === article.description;

    return typeIsSame && titleIsSame && descriptionIsSame;
}

function getArticleObjectFromArticleLink(articleLink, articles) {
    const articlesAsArray = Array.from(articles);

    return articlesAsArray
        .find(article=> isArticleLinkFromArticle(articleLink, article));
}

function ArticlesInRouter(props) {
    return <MemoryRouter><Articles {...props} /></MemoryRouter>;
}

test("Articles renders correct ArticleGroup when an article object is passed", () => {
    const article = {
        type: ArticleTypes.General,
        title: "Title",
        description: "Description"
    };

    const articles = mount(<ArticlesInRouter articles={[article]}/>);

    expect(articles.find(ArticleLinkGroup)).toHaveLength(1);
    const articleLinkGroup = articles.find(ArticleLinkGroup).at(0);
    expect(articleLinkGroup.prop("type")).toBe(article.type);

    expect(articleLinkGroup.find(ArticleLink)).toHaveLength(1);

    const articleLink = articles.find(ArticleLinkGroup).at(0).find(ArticleLink).at(0);

    expect(isArticleLinkFromArticle(articleLink, article)).toBe(true);
});

test("Articles renders correct single ArticleGroup when multiple article objects are passed", () => {
    const type = ArticleTypes.General;
    const article1 = {
        type,
        title: "Title 1",
        description: "Description 1"
    };
    const article2 = {
        type,
        title: "Title 2",
        description: "Description 2"
    };

    const articles = mount(<ArticlesInRouter articles={[article1, article2]}/>);

    expect(articles.find(ArticleLinkGroup)).toHaveLength(1);
    const articleLinkGroup = articles.find(ArticleLinkGroup).at(0);
    expect(articleLinkGroup.prop("type")).toBe(type);

    const articleLinks = articleLinkGroup.find(ArticleLink);

    expect(articleLinkGroup.find(ArticleLink)).toHaveLength(2);

    const articlesLeftToBeFound = new Set([article1, article2]);
    articleLinks.forEach(articleLink => {
        const articleCorrespondingToArticleLink = getArticleObjectFromArticleLink(articleLink, articlesLeftToBeFound);

        expect(articlesLeftToBeFound.has(articleCorrespondingToArticleLink)).toBe(true);

        articlesLeftToBeFound.delete(articleCorrespondingToArticleLink);
    });
});

test("Articles renders correct multiple ArticleGroups when article objects are passed", () => {
    const article1 = {
        type: ArticleTypes.General,
        title: "Title 1",
        description: "Description 1"
    };
    const article2 = {
        type: ArticleTypes.ShortestPath,
        title: "Title 2",
        description: "Description 2"
    };

    const articles = mount(<ArticlesInRouter articles={[article1, article2]}/>);

    const articleLinkGroups = articles.find(ArticleLinkGroup);

    expect(articleLinkGroups).toHaveLength(2);

    const articlesLeftToBeFound = new Set([article1, article2]);
    articleLinkGroups.forEach(articleLinkGroup => {
        expect(articleLinkGroup.find(ArticleLink)).toHaveLength(1);
        const articleLink = articleLinkGroup.find(ArticleLink).at(0);

        const articleCorrespondingToArticleLink = getArticleObjectFromArticleLink(articleLink, articlesLeftToBeFound);

        expect(articleLinkGroup.prop("type")).toBe(articleCorrespondingToArticleLink.type);

        expect(articlesLeftToBeFound.has(articleCorrespondingToArticleLink)).toBe(true);

        articlesLeftToBeFound.delete(articleCorrespondingToArticleLink);
    });
});