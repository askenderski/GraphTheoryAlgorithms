import ArticleRouting from "../../../../Components/Content/ArticlePage/ArticleRouting/ArticleRouting";
import {ArticleTypes} from "../../../../Data/articleTypes";
import {getOne} from "../../../../Services/articleService";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router";
import {Routes} from "../../../../Data/Routes/routes";
import {Route} from "react-router-dom";
import Article from "../../../../Components/Content/ArticlePage/Article/Article";
import {act, waitFor, render} from "@testing-library/react";
import Loading from "../../../../Components/Common/Loading/Loading";

jest.mock("../../../../Services/articleService", () => {
    return {
        getOne: jest.fn()
    };
});

function getArticleRouting(wrapper) {
    return wrapper.find(ArticleRouting).at(0);
}

function getRoutedArticleRouting(type=ArticleTypes.General, title="TopSort") {
    const articleRoute = Routes.articles.article.fullPath;

    return (
        <MemoryRouter initialEntries={[
            articleRoute
                .replace(":articleType", type.name)
                .replace(":articleTitle", title)
        ]}>
            <Route path={articleRoute} exact component={ArticleRouting}/>
        </MemoryRouter>
    );
}

test("Valid article link renders loading component before article appears", async () => {
    const mockedGetOne = async () => {
        return new Promise(()=>{});
    };

    getOne.mockImplementation(mockedGetOne);

    const id = "article1";

    const wrapper = mount(getRoutedArticleRouting(id));

    expect(getArticleRouting(wrapper).find(Loading)).toHaveLength(1);
});

test("Valid article link routes to Article component with valid props", async () => {
    const mockedGetOne = async () => {
        return Promise.resolve({
            title: "Some valid title",
            description: "Some valid description",
            type: ArticleTypes.General
        });
    };

    getOne.mockImplementation(mockedGetOne);

    const article = await getOne();

    const wrapper = mount(getRoutedArticleRouting());

    await waitFor(() => {
        act(()=>{
            wrapper.update();
        });

        expect(getArticleRouting(wrapper).find(Article)).toHaveLength(1);
    });

    const isProp = (prop, val) => expect(getArticleRouting(wrapper).find(Article).at(0).prop(prop)).toBe(val);

    isProp("title", article.title);
    isProp("description", article.description);
    isProp("type", article.type);
})

test("Invalid article link renders error", async () => {
    const mockedGetOne = () => Promise.reject();

    getOne.mockImplementation(mockedGetOne);

    const wrapper = render(getRoutedArticleRouting());

    await waitFor(() => {
        expect(wrapper.getByText("Invalid article")).toBeInTheDocument();
    });
})