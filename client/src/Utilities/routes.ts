import { IRoutesData } from "Data/Routes/routesData";
import { IAuthGuard } from "Guards/authGuards";
import {createElement} from "react";

export const addSubRoutes = function (route: IRoutesData) {
    const subRoutes = Object.values(route).filter(prop=>typeof prop === "object" && prop.root !== undefined);

    route.subRoutes = subRoutes;
    route.subRoutes.forEach((subRoute: IRoutesData)=>addSubRoutes(subRoute));
}

function addFullPath(route: IRoutesData, curPath="") {
    route.fullPath = curPath + route.root;
}

export const addFullPaths = function (route: IRoutesData, curPath="") {
    addFullPath(route, curPath);

    route.subRoutes.forEach((subRoute: IRoutesData)=>addFullPaths(subRoute, curPath + route.root));
}

function addFullRedirect(route: IRoutesData, rootRoute = route) {
    const routeToRedirectTo = (route.redirect as string[]).reduce((curRoute, curElementToAdd) => {
        return curRoute[curElementToAdd];
    }, rootRoute);

    route.fullRedirect = routeToRedirectTo.fullPath;
}

function addFullRedirectWithParams(route: IRoutesData, rootRoute = route) {
    const routeToRedirectTo = (route.redirectWithParams as string[]).reduce((curRoute, curElementToAdd) => {
        return curRoute[curElementToAdd];
    }, rootRoute);

    route.fullRedirectWithParams = routeToRedirectTo.fullPath;
}

export const addFullRedirects = function (route: IRoutesData, rootRoute = route) {
    if (route.redirect !== undefined) {
        addFullRedirect(route, rootRoute);
    }
    if (route.redirectWithParams !== undefined) {
        addFullRedirectWithParams(route, rootRoute);
    }

    route.subRoutes.forEach((subRoute: IRoutesData)=>addFullRedirects(subRoute, rootRoute));
}

function addRouteToRedirectToToComponentWithRedirectWithParams(route: IRoutesData) {
    const originalComponent = route.component as React.ElementType<any>;

    route.component = props => {
        return createElement(originalComponent, {...props, routeToRedirectTo: route.fullRedirectWithParams});
    }
}

export const addRouteToRedirectToToComponentsWithRedirectWithParams =
    function (route: IRoutesData, rootRoute = route) {
        if (route.redirectWithParams !== undefined) {
            addRouteToRedirectToToComponentWithRedirectWithParams(route);
        }

        route.subRoutes.forEach((subRoute: IRoutesData)=>
            addRouteToRedirectToToComponentsWithRedirectWithParams(subRoute, rootRoute));
    };

export const addGuard = function (route: IRoutesData) {
    if (route.component !== undefined) {
        const originalComponent = route.component;

        const guard = route.guard as IAuthGuard;

        route.component = guard(originalComponent);
    }
};

export const addGuards = function (route: IRoutesData, rootRoute = route) {
    if (route.guard !== undefined) {
        addGuard(route);
    }

    route.subRoutes.forEach((subRoute: IRoutesData)=>addGuards(subRoute, rootRoute));
};