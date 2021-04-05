import {addFullPaths, addFullRedirects, addSubRoutes, addRouteToRedirectToToComponentsWithRedirectWithParams} from "../../Utilities/routes";
import {RoutesData} from "./routesData";
import * as _ from "lodash";

const RoutesToExport = _.cloneDeep(RoutesData);

addSubRoutes(RoutesToExport);
addFullPaths(RoutesToExport);
addFullRedirects(RoutesToExport);
addRouteToRedirectToToComponentsWithRedirectWithParams(RoutesToExport);

export const Routes = RoutesToExport;

export const routesIterable = Object.values(Routes);