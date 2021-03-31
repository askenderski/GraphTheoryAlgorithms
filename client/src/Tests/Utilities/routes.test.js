import {addSubRoutes, addFullPaths, addFullRedirects} from "../../Utilities/routes";

describe("addSubRoutes", () => {
    test("Adds first-level subroutes", () => {
        const routesToTest = {
            root: "",

            subRoute1: {
                root: ""
            },
            subRoute2: {
                root: ""
            }
        };

        addSubRoutes(routesToTest);

        const addedSubRoutes = routesToTest.subRoutes;

        expect(addedSubRoutes).toHaveLength(2);
        [routesToTest.subRoute1, routesToTest.subRoute2]
            .forEach(subRoute => expect(addedSubRoutes).toContain(subRoute));
    });

    test("Adds only subroutes with root properties", () => {
        const routesToTest = {
            root: "",

            nonRoute1: {
            }
        };

        addSubRoutes(routesToTest);

        const addedSubRoutes = routesToTest.subRoutes;

        expect(addedSubRoutes).toHaveLength(0);
    });

    test("Does not add subroutes to objects without root properties", () => {
        const routesToTest = {
            root: "",

            nonRoute1: {
            }
        };

        addSubRoutes(routesToTest);

        const addedSubRoutes = routesToTest.nonRoute1.subRoutes;

        expect(addedSubRoutes).toBe(undefined);
    });

    test("Adds all-level subroutes", () => {
        const routesToTest = {
            root: "",

            subRoute1: {
                root: "",

                subSubRoute1: {
                    root: ""
                },
                subSubRoute2: {
                    root: ""
                }
            },
            subRoute2: {
                root: "",

                subSubRoute1: {
                    root: ""
                },
                subSubRoute2: {}
            }
        };

        addSubRoutes(routesToTest);

        const addedSubRoutesToRoute = routesToTest.subRoutes;

        expect(addedSubRoutesToRoute).toHaveLength(2);
        [routesToTest.subRoute1, routesToTest.subRoute2]
            .forEach(subRoute => expect(addedSubRoutesToRoute).toContain(subRoute));

        const addedSubRoutesToSubRoute1 = routesToTest.subRoute1.subRoutes;

        expect(addedSubRoutesToSubRoute1).toHaveLength(2);
        [routesToTest.subRoute1.subSubRoute1, routesToTest.subRoute1.subSubRoute2]
            .forEach(subRoute => expect(addedSubRoutesToSubRoute1).toContain(subRoute));

        const addedSubRoutesToSubRoute2 = routesToTest.subRoute2.subRoutes;

        expect(addedSubRoutesToSubRoute2).toHaveLength(1);
        [routesToTest.subRoute2.subSubRoute1]
            .forEach(subRoute => expect(addedSubRoutesToSubRoute2).toContain(subRoute));
    });
});

describe("addFullPaths", () => {
    test("Adds path to original route", () => {
        const root = "/a";

        const routesToTest = {
            root
        };

        addSubRoutes(routesToTest);
        addFullPaths(routesToTest);

        const fullPath = routesToTest.fullPath;

        expect(fullPath).toBe(root);
    });

    test("Adds full paths correctly to subroutes which are direct children of original route", () => {
        const routesToTest = {
            root: "/a",

            subRoute1: {
                root: "/b"
            }
        };

        addSubRoutes(routesToTest);
        addFullPaths(routesToTest);

        const fullPath = routesToTest.subRoute1.fullPath;

        expect(fullPath).toBe("/a/b");
    });

    test("Adds full paths correctly to all-level subroutes", () => {
        const routesToTest = {
            root: "/a",

            subRoute1: {
                root: "/b",

                subSubRoute1: {
                    root: "/c"
                },
                subSubRoute2: {
                    root: "/c1"
                }
            }
        };

        addSubRoutes(routesToTest);
        addFullPaths(routesToTest);

        const fullPath1 = routesToTest.subRoute1.subSubRoute1.fullPath;

        expect(fullPath1).toBe("/a/b/c");

        const fullPath2 = routesToTest.subRoute1.subSubRoute2.fullPath;

        expect(fullPath2).toBe("/a/b/c1");
    });

    test("Adds full paths only to subroutes with root properties", () => {
        const routesToTest = {
            root: "/a",

            nonRoute1: {
            }
        };

        addSubRoutes(routesToTest);
        addFullPaths(routesToTest);

        const fullPath = routesToTest.nonRoute1.fullPath;

        expect(fullPath).toBeUndefined();
    });
});

describe("addFullRedirects", () => {
    test("Adds full redirect correctly to subroute which is passed directly", () => {
        const root = "/a";
        const subRouteRoot = "/b";
        const subSubRouteRoot = "/c";

        const routesToTest = {
            root,

            subRoute: {
                root: subRouteRoot,

                subSubRoute: {
                    root: subSubRouteRoot
                }
            }
        };

        const routeWithRedirect = {
            root: "",

            redirect: ["subRoute", "subSubRoute"]
        };

        addSubRoutes(routesToTest);
        addSubRoutes(routeWithRedirect);
        addFullPaths(routesToTest);
        addFullRedirects(routeWithRedirect, routesToTest);

        const fullRedirect = routeWithRedirect.fullRedirect;

        expect(fullRedirect).toBe(routesToTest.subRoute.subSubRoute.fullPath);
    });

    test("Adds full redirects correctly to all-level subroutes", () => {
        const root = "/a";
        const subRoute1Root = "/b1";
        const subRoute2Root = "/b2";
        const subSubRoute1Root = "/c1";
        const subSubRoute2Root = "/c2";

        const routesToTest = {
            root,

            subRoute1: {
                root: subRoute1Root,

                subSubRoute1: {
                    root: subSubRoute1Root,
                    redirect: ["subRoute2"]
                },
                subSubRoute2: {
                    root: subSubRoute2Root,
                    redirect: ["subRoute1", "subSubRoute1"]
                },
            },
            subRoute2: {
                root: subRoute2Root
            }
        };

        addSubRoutes(routesToTest);
        addFullPaths(routesToTest);
        addFullRedirects(routesToTest);

        const fullRedirect1 = routesToTest.subRoute1.subSubRoute1.fullRedirect;

        expect(fullRedirect1).toBe(routesToTest.subRoute2.fullPath);

        const fullRedirect2 = routesToTest.subRoute1.subSubRoute2.fullRedirect;

        expect(fullRedirect2).toBe(routesToTest.subRoute1.subSubRoute1.fullPath);
    });

    test("Adds full redirects only to subroutes with redirect properties", () => {
        const routesToTest = {
            root: "/a",

            subRoute1: {
                root: "/b"
            }
        };

        addSubRoutes(routesToTest);
        addFullPaths(routesToTest);
        addFullRedirects(routesToTest);

        const fullRedirect = routesToTest.subRoute1.fullRedirect;
        expect(fullRedirect).toBeUndefined();
    });
});