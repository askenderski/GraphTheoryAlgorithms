import {IAuthGuard, IsNotLoggedIn} from "../../Guards/authGuards";
import React, {createElement, lazy, Suspense} from "react";
import Loading from "../../Components/Common/Loading/Loading";

function moduleLocationToComponent(moduleLocation: string) {
    const Component: React.ElementType = function (props) {
        return (
            <Suspense fallback={<Loading />}>
                {createElement(lazy(() => import("../../Components/Content/"+moduleLocation)), props)}
            </Suspense>
        );
    };

    return Component;
}

const AboutModule = moduleLocationToComponent("About/About");
const ArticleRoutingModule = moduleLocationToComponent("ArticlePage/ArticleRouting/ArticleRouting");
const DefaultAlgorithmRoutingModule = moduleLocationToComponent("AlgorithmPage/DefaultAlgorithmRouting");
const AlgorithmRoutingModule = moduleLocationToComponent("AlgorithmPage/AlgorithmRouting");
const RegistrationFormModule = moduleLocationToComponent("RegistrationForm/RegistrationForm");
const LoginFormModule = moduleLocationToComponent("LoginForm/LoginForm");
const ArticlesPageModule = moduleLocationToComponent("ArticlesPage/ArticlesPage");

export interface IRoutesData {
    root: string,
    component?: React.ComponentType,
    redirect?: string[],
    redirectWithParams?: string[],
    guard?: IAuthGuard,

    [key: string]: any
};

export const RoutesData: IRoutesData = {
    root: "",

    home: {
        root: "/",
        redirect: ["articles"]
    },
    articles: {
        root: "/articles",

        allArticles: {
            root: "/",
            component: ArticlesPageModule
        },
        article: {
            root: "/:articleType/:articleTitle",
            component: ArticleRoutingModule
        }
    },
    about: {
        root: "/about",
        component: AboutModule
    },
    algorithms: {
        root: "/algorithms",

        algorithmType: {
            root: "/:algorithmType",

            algorithm: {
                root: "/:algorithmTitle",

                defaultGraph: {
                    root: "/",

                    redirectWithParams: ["algorithms", "algorithmType", "algorithm", "algorithmGraph"],
                    component: DefaultAlgorithmRoutingModule
                },
                algorithmGraph: {
                    root: "/graphs/:graphId",
                    component: AlgorithmRoutingModule
                }
            }
        }
    },
    authentication: {
        root: "/auth",

        registration: {
            root: "/registration",

            guard: IsNotLoggedIn,
            component: RegistrationFormModule
        },

        login: {
            root: "/login",

            guard: IsNotLoggedIn,
            component: LoginFormModule
        }
    }
};