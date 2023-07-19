import {render, fireEvent, waitFor, screen, getByText, cleanup, act} from '@testing-library/react';
import Content from "../../../Components/Content/Content.tsx";
import {withRouter} from "react-router-dom";
import {mount} from "enzyme";
import {MemoryRouter} from "react-router";
import {addFullPaths, addFullRedirects, addSubRoutes} from "../../../Utilities/routes";
import * as _ from "lodash";
import {RoutesData} from "../../../Data/Routes/routesData.tsx";

afterEach(()=>{
    curLocation = undefined;
    cleanup();
});

let curLocation;

const ContentLocationProxy = withRouter(props => {
    curLocation = props.location;

    return <Content {...props}/>;
});

function testRouteWithComponent(route, topLevelRoute) {
    test(`${route.fullPath} renders correct component`, () => {
        const wrapper = mount(<MemoryRouter initialEntries={[route.fullPath]}><Content routes={topLevelRoute}/></MemoryRouter>);
        wrapper.update();

        expect(wrapper.find(route.component)).toHaveLength(1);
    });
}

function testRedirectingRoute(route, topLevelRoute) {
    test(`${route.fullPath} redirects to ${route.fullRedirect}`, () => {
        mount(<MemoryRouter initialEntries={[route.fullPath]}><ContentLocationProxy routes={topLevelRoute}/></MemoryRouter>);

        expect(curLocation.pathname).toBe(route.fullRedirect);
    });
}

function testRoute(route, topLevelRoute) {
    if (route.component !== undefined) {
        return testRouteWithComponent(route, topLevelRoute);
    }

    if (route.redirect !== undefined) {
        return testRedirectingRoute(route, topLevelRoute);
    }
}

function testRoutes(route, topLevelRoute = route) {
    testRoute(route, topLevelRoute);

    route.subRoutes.forEach(route=>{
        testRoutes(route, topLevelRoute);
    });
}

const getNewComponent = () => (() => <></>);

describe("Test routing extensively", () => {
    const RoutesToTest = {
        root: "",

        subRoute1: {
            root: "/a1",

            subSubRoute1: {
                root: "/b1",

                subSubSubRoute1: {
                    root: "/c1",

                    component: getNewComponent()
                },
                subSubSubRoute2: {
                    root: "",

                    component: getNewComponent()
                }
            },
            subSubRoute2: {
                root: "/b2",

                component: getNewComponent()
            },
            subSubRoute3: {
                root: "/b3",

                redirect: ["subRoute1", "subSubRoute1", "subSubSubRoute1"]
            }
        }
    };

    addSubRoutes(RoutesToTest);
    addFullPaths(RoutesToTest);
    addFullRedirects(RoutesToTest);

    testRoutes(RoutesToTest);
});

describe("Test routes used in application", () => {
    //Some components have complex behaviour (or even call API-s) when we only need to test that they're rendered and so we
    //replace them here
    function replaceRouteComponents(route) {
        if (route.component !== undefined) {
            route.component = getNewComponent();
        }

        route.subRoutes.forEach(subRoute=>replaceRouteComponents(subRoute));
    }

    const RoutesCloned = _.cloneDeep(RoutesData);

    addSubRoutes(RoutesCloned);
    addFullPaths(RoutesCloned);
    addFullRedirects(RoutesCloned);

    replaceRouteComponents(RoutesCloned);

    testRoutes(RoutesCloned);
});