import NodesCard from "../../../Components/Content/NodesCard/NodesCard";
import {mount} from "enzyme";
import Nodes from "../../../Components/Content/Nodes/Nodes";
import {fireEvent, render} from "@testing-library/react";

const defaultHandlers = { setNode: () => {}, addNode: () => {} };

jest.mock("../../../Components/Content/Nodes/Nodes", () => jest.fn());

beforeEach(()=>{
    Nodes.mockImplementation(()=>null);
});

test("NodesCard contains Nodes component with correct props", () => {
    const nodes = {};
    const handlers = defaultHandlers;

    const wrapper = mount(<NodesCard nodes={nodes} handlers={handlers} />);

    const nodesComponent = wrapper.find(Nodes);

    expect(nodesComponent).toHaveLength(1);

    expect(nodesComponent.prop("nodes")).toBe(nodes);

    const handlersOfNodesComponent = nodesComponent.prop("handlers");
    expect(nodesComponent.prop("handlers")).toEqual({setNode: handlers.setNode});
});

test("NodesCard adds node when Add Node button is clicked", () => {
    const nodes = {};
    const handlers = {...defaultHandlers, addNode: jest.fn()};

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} />);

    fireEvent.click(wrapper.getByText("Add Node"));

    expect(handlers.addNode).toHaveBeenCalledTimes(1);
});