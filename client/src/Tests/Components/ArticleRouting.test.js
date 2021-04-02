import ArticleRouting from "../../Components/ArticleRouting/ArticleRouting";
import {ArticleTypes} from "../../Data/articleTypes";
import {getOne} from "../../Services/articleService";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router";
import {Routes} from "../../Data/Routes/routes";
import {Route} from "react-router-dom";
import Article from "../../Components/Article/Article";
import {act, waitFor} from "@testing-library/react";
import Loading from "../../Components/Loading/Loading";

jest.mock("../../Services/articleService", () => {
    return {
        getOne: jest.fn()
    };
});

test("Valid article link renders loading component before article appears", async () => {
    const mockedGetOne = async () => {
        return new Promise(()=>{});
    };

    getOne.mockImplementation(mockedGetOne);

    const id = "article1";
    const articleRoute = Routes.articles.article.fullPath;

    const wrapper = mount(
        <MemoryRouter initialEntries={[articleRoute.replace(":articleId", id)]}>
            <Route path={Routes.articles.article.fullPath} exact component={ArticleRouting}/>
        </MemoryRouter>
    );

    const articleRouting = wrapper.find(ArticleRouting).at(0);

    expect(articleRouting.find(Loading)).toHaveLength(1);
});

test("Valid article link routes to Article component with valid props", async () => {
    const mockedGetOne = async (id) => {
        const articles = {
            article1: {
                title: "Some valid title",
                description: "Some valid description",
                type: ArticleTypes.General
            }
        };

        return Promise.resolve(articles[id]);
    };

    getOne.mockImplementation(mockedGetOne);

    const id = "article1";
    const article = await getOne(id);
    const articleRoute = Routes.articles.article.fullPath;

    const wrapper = mount(
        <MemoryRouter initialEntries={[articleRoute.replace(":articleId", id)]}>
            <Route path={Routes.articles.article.fullPath} exact component={ArticleRouting}/>
        </MemoryRouter>
    );

    const getArticleRouting = () => wrapper.find(ArticleRouting).at(0);

    await waitFor(() => {
        act(()=>{
            wrapper.update();
        });

        expect(getArticleRouting().find(Article)).toHaveLength(1);
    });

    const isProp = (prop, val) => expect(getArticleRouting().find(Article).at(0).prop(prop)).toBe(val);

    isProp("title", article.title);
    isProp("description", article.description);
    isProp("type", article.type);
});