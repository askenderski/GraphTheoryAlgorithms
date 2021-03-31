export const addSubRoutes = function (route) {
    const subRoutes = Object.values(route).filter(prop=>typeof prop === "object" && prop.root !== undefined);

    route.subRoutes = subRoutes;
    route.subRoutes.forEach(subRoute=>addSubRoutes(subRoute));
}

function addFullPath(route, curPath="") {
    route.fullPath = curPath + route.root;
}

export const addFullPaths = function (route, curPath="") {
    addFullPath(route, curPath);

    route.subRoutes.forEach(subRoute=>addFullPaths(subRoute, curPath + route.root));
}

function addFullRedirect(route, rootRoute = route) {
    const routeToRedirectTo = route.redirect.reduce((curRoute, curElementToAdd) => {
        return curRoute[curElementToAdd];
    }, rootRoute);

    // if (routeToRedirectTo.fullPath !== undefined) {
        route.fullRedirect = routeToRedirectTo.fullPath;
    // }

    // if (routeToRedirectTo.redirect !== undefined) {
    //     if (routeToRedirectTo.fullRedirect !== undefined) {
    //         addFullRedirect(route);
    //     }
    //
    //     route.fullRedirect = routeToRedirectTo.fullRedirect;
    // }
}

export const addFullRedirects = function (route, rootRoute = route) {
    if (route.redirect !== undefined
        // && route.fullRedirect === undefined
    ) {
        addFullRedirect(route, rootRoute);
    }

    route.subRoutes.forEach(subRoute=>addFullRedirects(subRoute, rootRoute));
}