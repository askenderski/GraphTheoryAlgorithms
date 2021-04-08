import About from "../../Components/Content/About/About";
import ArticleRouting from "../../Components/Content/ArticlePage/ArticleRouting/ArticleRouting";
import DefaultAlgorithmRouting from "../../Components/Content/AlgorithmPage/DefaultAlgorithmRouting";
import RegistrationForm from "../../Components/Content/RegistrationForm/RegistrationForm";

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

            component: RegistrationForm
        }
    }
};