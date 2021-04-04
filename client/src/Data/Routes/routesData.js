import About from "../../Components/Content/About/About";
import ArticleRouting from "../../Components/Content/ArticleRouting/ArticleRouting";

export const RoutesData = {
    root: "",

    home: {
        root: "/",
        redirect: ["articles"]
    },
    articles: {
        root: "/articles",

        article: {
            root: "/:articleId",
            component: ArticleRouting
        }
    },
    about: {
        root: "/about",
        component: About
    }
};