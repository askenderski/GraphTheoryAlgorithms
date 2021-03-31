import {Layout} from "antd";
import {Redirect, Route, Switch} from "react-router-dom";

function getRoutes(route) {
    return route.subRoutes.map(subRoute=> {
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

        routeProps.render = () => getRoutes(subRoute);

        return <Route {...routeProps}/>;
    });
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