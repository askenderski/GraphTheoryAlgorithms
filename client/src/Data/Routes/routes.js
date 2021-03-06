import {
    addFullPaths,
    addFullRedirects,
    addSubRoutes,
    addRouteToRedirectToToComponentsWithRedirectWithParams,
    addGuards
} from "../../Utilities/routes";
import {RoutesData} from "./routesData";
import * as _ from "lodash";

const RoutesToExport = _.cloneDeep(RoutesData);

addSubRoutes(RoutesToExport);
addFullPaths(RoutesToExport);
addFullRedirects(RoutesToExport);
addRouteToRedirectToToComponentsWithRedirectWithParams(RoutesToExport);
addGuards(RoutesToExport);

export const Routes = RoutesToExport;

export const routesIterable = Object.values(Routes);