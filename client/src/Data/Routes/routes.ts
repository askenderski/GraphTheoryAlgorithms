import {
    addFullPaths,
    addFullRedirects,
    addSubRoutes,
    addRouteToRedirectToToComponentsWithRedirectWithParams,
    addGuards
} from "../../Utilities/routes";
import {IRoutesData, RoutesData} from "./routesData";
import * as _ from "lodash";

export interface IRoutes extends IRoutesData {
    addSubRoutes(route: IRoutesData): void,
    addFullPaths(route: IRoutesData, curPath: string): void,
    addFullRedirects(route: IRoutesData, rootRoute: IRoutesData): void,
    addRouteToRedirectToToComponentsWithRedirectWithParams(route: IRoutesData, rootRoute: IRoutesData): void,
    addGuards(route: IRoutesData, rootRoute: IRoutesData): void
}

const RoutesToExport = _.cloneDeep(RoutesData);

addSubRoutes(RoutesToExport);
addFullPaths(RoutesToExport);
addFullRedirects(RoutesToExport);
addRouteToRedirectToToComponentsWithRedirectWithParams(RoutesToExport);
addGuards(RoutesToExport);

export const Routes = RoutesToExport as IRoutes;

export const routesIterable = Object.values(Routes);