import {Layout} from "antd";
import {Redirect, Route, Switch} from "react-router-dom";
import InvalidRoute from "../Common/InvalidRoute/InvalidRoute";
import Loading from "../Common/Loading/Loading";
import {createElement, useEffect, useState} from "react";

function getRoutes(route) {
    return [...route.subRoutes.map(subRoute=> {
        const routeProps = {
            path: subRoute.fullPath,
            key: subRoute.fullPath
        };

        if (subRoute.component !== undefined) {
            routeProps.component = subRoute.component;

            routeProps.exact = true;

            return <Route  {...routeProps}/>;
        }
        if (subRoute.fullRedirect !== undefined) {
            routeProps.render = () => <Redirect to={subRoute.fullRedirect}/>;
            routeProps.exact = true;

            return <Route {...routeProps}/>;
        }

        routeProps.render = () => <Switch>{getRoutes(subRoute)}</Switch>;

        return <Route {...routeProps}/>;
    }), <Route path="/" key="InvalidRoute" component={InvalidRoute}/>];
}

function getRouting(routes) {
    return (
        <Switch>
            {getRoutes(routes)}
        </Switch>
    );
}

export default function ({routes}) {
    return (
        <Layout.Content>{getRouting(routes)}</Layout.Content>
    );
}