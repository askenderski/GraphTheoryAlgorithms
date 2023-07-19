import {Redirect, Route, RouteProps, Switch} from "react-router-dom";
import InvalidRoute from "../Common/InvalidRoute/InvalidRoute";
import { IRoutes } from "Data/Routes/routes";
import { Layout } from "antd";

function getRoutes(route: IRoutes) {
    return [...route.subRoutes.map((subRoute: IRoutes)=> {
        const routeProps: RouteProps = {path: subRoute.fullPath};
        const key = subRoute.fullPath;

        if (subRoute.component !== undefined) {
            routeProps.component = subRoute.component;

            routeProps.exact = true;

            return <Route key={key} {...routeProps}/>;
        }
        if (subRoute.fullRedirect !== undefined) {
            routeProps.render = () => <Redirect to={subRoute.fullRedirect}/>;
            routeProps.exact = true;

            return <Route key={key} {...routeProps}/>;
        }

        routeProps.render = () => <Switch>{getRoutes(subRoute)}</Switch>;

        return <Route key={key} {...routeProps}/>;
    }), <Route path="/" key="InvalidRoute" component={InvalidRoute}/>];
}

function getRouting(routes: IRoutes) {
    return (
        <Switch>
            {getRoutes(routes)}
        </Switch>
    );
}

export default function Content({routes}: {routes: IRoutes}) {
    return (
        <Layout.Content>{getRouting(routes)}</Layout.Content>
    );
}