import NodesCard from "../../../Components/Content/NodesCard/NodesCard";
import {mount} from "enzyme";
import Nodes from "../../../Components/Content/Nodes/Nodes";

jest.mock("../../../Components/Content/Nodes/Nodes", () => jest.fn());

test("NodesCard contains Nodes component with correct props", () => {
    Nodes.mockImplementation(()=>null);

    const nodes = {};
    const handlers = {};

    const wrapper = mount(<NodesCard nodes={nodes} handlers={handlers} />);

    const nodesComponent = wrapper.find(Nodes);

    expect(nodesComponent).toHaveLength(1);

    expect(nodesComponent.prop("nodes")).toBe(nodes);
    expect(nodesComponent.prop("handlers")).toBe(handlers);
})