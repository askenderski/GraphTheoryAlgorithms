import {createElement} from "react";

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

    route.fullRedirect = routeToRedirectTo.fullPath;
}

function addFullRedirectWithParams(route, rootRoute = route) {
    const routeToRedirectTo = route.redirectWithParams.reduce((curRoute, curElementToAdd) => {
        return curRoute[curElementToAdd];
    }, rootRoute);

    route.fullRedirectWithParams = routeToRedirectTo.fullPath;
}

export const addFullRedirects = function (route, rootRoute = route) {
    if (route.redirect !== undefined) {
        addFullRedirect(route, rootRoute);
    }
    if (route.redirectWithParams !== undefined) {
        addFullRedirectWithParams(route, rootRoute);
    }

    route.subRoutes.forEach(subRoute=>addFullRedirects(subRoute, rootRoute));
}

function addRouteToRedirectToToComponentWithRedirectWithParams(route) {
    const originalComponent = route.component;

    route.component = props => {
        return createElement(originalComponent, {...props, routeToRedirectTo: route.fullRedirectWithParams});
    }
}

export const addRouteToRedirectToToComponentsWithRedirectWithParams = function (route, rootRoute = route) {
    if (route.redirectWithParams !== undefined) {
        addRouteToRedirectToToComponentWithRedirectWithParams(route);
    }

    route.subRoutes.forEach(subRoute=>addRouteToRedirectToToComponentsWithRedirectWithParams(subRoute, rootRoute));
};

export const addGuard = function (route) {
    if (route.component !== undefined) {
        const originalComponent = route.component;

        route.component = route.guard(originalComponent);
    }
};

export const addGuards = function (route, rootRoute = route) {
    if (route.guard !== undefined) {
        addGuard(route);
    }

    route.subRoutes.forEach(subRoute=>addGuards(subRoute, rootRoute));
};