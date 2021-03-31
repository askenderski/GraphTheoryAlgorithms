import About from "../Components/About/About";
import {addFullPaths, addFullRedirects, addSubRoutes} from "../Utilities/routes";

export const Routes = {
    root: "",

    home: {
        root: "/",
        redirect: ["articles"]
    },
    articles: {
        root: "/articles",
    },
    about: {
        root: "/about",
        component: About
    }
};

addSubRoutes(Routes);
addFullPaths(Routes);
addFullRedirects(Routes);

export const routesIterable = Object.values(Routes);