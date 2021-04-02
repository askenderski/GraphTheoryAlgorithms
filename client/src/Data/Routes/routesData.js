import About from "../../Components/About/About";

export const RoutesData = {
    root: "",

    home: {
        root: "/",
        redirect: ["articles"]
    },
    articles: {
        root: "/articles"
    },
    about: {
        root: "/about",
        component: About
    }
};