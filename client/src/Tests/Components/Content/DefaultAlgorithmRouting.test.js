import {Routes} from "../../../Data/Routes/routes";
import {MemoryRouter} from "react-router";
import {Redirect, Route} from "react-router-dom";
import DefaultAlgorithmRouting from "../../../Components/Content/AlgorithmPage/DefaultAlgorithmRouting";
import {AlgorithmTypes} from "../../../Data/Algorithms/algorithms";
import {mount} from "enzyme";
import {getOneByTypeAndTitle} from "../../../Services/algorithmService";
import Loading from "../../../Components/Common/Loading/Loading";
import {act, waitFor, render} from "@testing-library/react";
import * as React from "react";

jest.mock("../../../Services/algorithmService", () => {
    return {
        getOneByTypeAndTitle: jest.fn()
    };
});

jest.mock('react-router-dom', () => {
    // Require the original module to not be mocked...
    const originalModule = jest.requireActual('react-router-dom');

    return {
        __esModule: true,
        ...originalModule,
        Redirect: jest.fn()
    };
});

jest.mock('react', () => {
    // Require the original module to not be mocked...
    const originalModule = jest.requireActual('react');

    return {
        __esModule: true,
        ...originalModule,
        Suspense: jest.fn()
    };
});

const defaultAlgorithmRoute = Routes.algorithms.algorithmType.algorithm.defaultGraph.fullPath;
const algorithmRoute = Routes.algorithms.algorithmType.algorithm.algorithmGraph.fullPath;

function getRoutedDefaultAlgorithmRouting(algorithmType, algorithmTitle) {
    return (
        <MemoryRouter initialEntries={[
            defaultAlgorithmRoute
                .replace(":algorithmType", algorithmType)
                .replace(":algorithmTitle", algorithmTitle)
        ]}>
            <Route
                path={defaultAlgorithmRoute}
                render={props=>{
                    return (
                    <DefaultAlgorithmRouting
                        {...props}
                        routeToRedirectTo=
                            {Routes.algorithms.algorithmType.algorithm.defaultGraph.fullRedirectWithParams}
                    />
                    )}
                } />
        </MemoryRouter>
    );
}

test("Algorithm shows Loading before graph has loaded", async () => {
    getOneByTypeAndTitle.mockImplementation(() => {
        return new Promise(()=>{});
    });

    const algorithmType = AlgorithmTypes.General;
    const algorithm = algorithmType.TopSort;
    const algorithmTypeId = algorithmType.name;
    const algorithmId = algorithm.name;
    const routedDefaultAlgorithmRouting = mount(getRoutedDefaultAlgorithmRouting(algorithmTypeId, algorithmId));

    await act(async () => {
        await Promise.resolve();
        routedDefaultAlgorithmRouting.update();
    });

    expect(routedDefaultAlgorithmRouting.find(DefaultAlgorithmRouting)).toHaveLength(1);
    expect(routedDefaultAlgorithmRouting.find(DefaultAlgorithmRouting).find(Loading)).toHaveLength(1);

    routedDefaultAlgorithmRouting.unmount();
});

test("Valid algorithm routes to Algorithm routing with its correct default graph", async () => {
    const graphId = "defaultGraphForAlgorithmId'sId";
    let locationToRedirectTo;

    getOneByTypeAndTitle.mockImplementation((algorithmTypeId, algorithmId) => {
        const graphs = {
            General: {
                TopSort: {
                    _id: graphId
                }
            }
        };

        return Promise.resolve(graphs[algorithmTypeId][algorithmId]);
    });
    Redirect.mockImplementation(props=>{
        locationToRedirectTo = props.to;
        return null;
    });

    const algorithmType = AlgorithmTypes.General;
    const algorithm = algorithmType.TopSort;
    const algorithmTypeId = algorithmType.name;
    const algorithmId = algorithm.name;
    const routedDefaultAlgorithmRouting = mount(getRoutedDefaultAlgorithmRouting(algorithmTypeId, algorithmId));

    await act(async () => {
        await Promise.resolve();
        routedDefaultAlgorithmRouting.update();
    });

    expect(locationToRedirectTo).toBe(
        algorithmRoute
            .replace(":algorithmType", algorithmTypeId)
            .replace(":algorithmTitle", algorithmId)
            .replace(":graphId", graphId)
    );

    routedDefaultAlgorithmRouting.unmount();
});

test("Invalid algorithm renders error", async () => {
    getOneByTypeAndTitle.mockImplementation(() => {
        return Promise.reject();
    });

    const algorithmType = AlgorithmTypes.General;
    const algorithmTypeId = algorithmType.name;
    const algorithmId = "invalid algorithm";
    const routedDefaultAlgorithmRouting = render(getRoutedDefaultAlgorithmRouting(algorithmTypeId, algorithmId));

    await waitFor(async () => {
        expect(routedDefaultAlgorithmRouting.getByText("Error in loading algorithm")).toBeInTheDocument();
    });
});