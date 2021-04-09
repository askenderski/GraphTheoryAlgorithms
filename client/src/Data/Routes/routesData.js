import About from "../../Components/Content/About/About";
import ArticleRouting from "../../Components/Content/ArticlePage/ArticleRouting/ArticleRouting";
import DefaultAlgorithmRouting from "../../Components/Content/AlgorithmPage/DefaultAlgorithmRouting";
import RegistrationForm from "../../Components/Content/RegistrationForm/RegistrationForm";
import LoginForm from "../../Components/Content/LoginForm/LoginForm";
import {IsNotLoggedIn} from "../../Guards/authGuards";
import ArticlesPage from "../../Components/Content/ArticlesPage/ArticlesPage";

export const RoutesData = {
    root: "",

    home: {
        root: "/",
        redirect: ["articles"]
    },
    articles: {
        root: "/articles",

        allArticles: {
            root: "/",
            component: ArticlesPage
        },
        article: {
            root: "/:articleId",
            component: ArticleRouting
        }
    },
    about: {
        root: "/about",
        component: About
    },
    algorithms: {
        root: "/algorithms",

        algorithmType: {
            root: "/:algorithmTypeId",

            algorithm: {
                root: "/:algorithmId",

                defaultGraph: {
                    root: "/",

                    redirectWithParams: ["algorithms", "algorithmType", "algorithm", "algorithmGraph"],
                    component: DefaultAlgorithmRouting
                },
                algorithmGraph: {
                    root: "/graphs/:graphId",
                }
            }
        }
    },
    authentication: {
        root: "/auth",

        registration: {
            root: "/registration",

            guard: IsNotLoggedIn,
            component: RegistrationForm
        },

        login: {
            root: "/login",

            guard: IsNotLoggedIn,
            component: LoginForm
        }
    }
};