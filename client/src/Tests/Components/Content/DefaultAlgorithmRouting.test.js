import {Routes} from "../../../Data/Routes/routes";
import {MemoryRouter} from "react-router";
import {Redirect} from "react-router-dom";
import DefaultAlgorithmRouting from "../../../Components/Content/AlgorithmPage/DefaultAlgorithmRouting";
import {AlgorithmTypes} from "../../../Data/Algorithms/algorithms";
import {mount} from "enzyme";
import Content from "../../../Components/Content/Content";
import {getOne} from "../../../Services/algorithmService";
import Loading from "../../../Components/Common/Loading/Loading";
import {act, waitFor, render} from "@testing-library/react";

jest.mock("../../../Services/algorithmService", () => {
    return {
        getOne: jest.fn()
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

//Here Content is being used as it is assumed that it has been fully tested

const defaultAlgorithmRoute = Routes.algorithms.algorithmType.algorithm.defaultGraph.fullPath;
const algorithmRoute = Routes.algorithms.algorithmType.algorithm.algorithmGraph.fullPath;

function getRoutedDefaultAlgorithmRouting(algorithmTypeId, algorithmId) {return (
        <MemoryRouter initialEntries={[
            defaultAlgorithmRoute
                .replace(":algorithmTypeId", algorithmTypeId)
                .replace(":algorithmId", algorithmId)
        ]}>
            <Content routes={Routes}/>
        </MemoryRouter>
    );
}

test("Algorithm shows Loading before graph has loaded", async () => {
    getOne.mockImplementation(() => {
        return new Promise(()=>{});
    });

    const algorithmType = AlgorithmTypes.General;
    const algorithm = algorithmType.TopSort;
    const algorithmTypeId = algorithmType.name;
    const algorithmId = algorithm.name;
    const routedDefaultAlgorithmRouting = mount(getRoutedDefaultAlgorithmRouting(algorithmTypeId, algorithmId));

    expect(routedDefaultAlgorithmRouting.find(DefaultAlgorithmRouting)).toHaveLength(1);
    expect(routedDefaultAlgorithmRouting.find(DefaultAlgorithmRouting).find(Loading)).toHaveLength(1);
});

test("Valid algorithm routes to Algorithm routing with its correct default graph", async () => {
    const graphId = "defaultGraphForAlgorithmId'sId";
    let locationToRedirectTo;

    getOne.mockImplementation((algorithmTypeId, algorithmId) => {
        const graphs = {
            General: {
                TopSort: {
                    id: graphId
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
            .replace(":algorithmTypeId", algorithmTypeId)
            .replace(":algorithmId", algorithmId)
            .replace(":graphId", graphId)
    );
});

test("Invalid algorithm renders error", async () => {
    getOne.mockImplementation(() => {
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