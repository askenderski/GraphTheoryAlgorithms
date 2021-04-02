import About from "../../Components/About/About";
import ArticleRouting from "../../Components/ArticleRouting/ArticleRouting";

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