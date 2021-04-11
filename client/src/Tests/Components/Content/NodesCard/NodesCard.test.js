import NodesCard from "../../../../Components/Content/AlgorithmPage/NodesCard/NodesCard";
import {mount} from "enzyme";
import Nodes from "../../../../Components/Content/AlgorithmPage/NodesCard/Nodes/Nodes";
import {act, fireEvent, render} from "@testing-library/react";

const defaultHandlers = { setNode: () => {}, addNode: () => {}, deleteNode: () => {} };

//useToggle is presumed to be working and so it is not mocked
jest.mock("../../../../Components/Content/AlgorithmPage/NodesCard/Nodes/Nodes", () => jest.fn());

beforeEach(()=>{
    Nodes.mockImplementation(()=>null);
});

test("NodesCard contains Nodes component with correct props", () => {
    const nodes = {};
    const handlers = defaultHandlers;

    const wrapper = mount(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    const nodesComponent = wrapper.find(Nodes);

    expect(nodesComponent).toHaveLength(1);

    expect(nodesComponent.prop("nodes")).toBe(nodes);

    const handlersOfNodesComponent = nodesComponent.prop("handlers");
    //setNode shouldn't be changed
    expect(handlersOfNodesComponent).toMatchObject({ setNode: handlers.setNode });
    //deleteNode is changed and so we cannot match for reference, but simply to mak sure it's passed down
    expect(handlersOfNodesComponent.deleteNode).not.toBeUndefined();
});

test("NodesCard adds node when Add Node button is clicked", () => {
    const nodes = {};
    const handlers = {...defaultHandlers, addNode: jest.fn()};

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    fireEvent.click(wrapper.getByText("Add Node"));

    expect(handlers.addNode).toHaveBeenCalledTimes(1);
});

test("NodesCard has delete button", () => {
    const nodes = {};
    const handlers = defaultHandlers;

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    const deleteNodesButton = wrapper.getByText("Delete Node");

    expect(deleteNodesButton).toBeInTheDocument();
});

test("NodesCard puts Nodes component in delete mode when delete button is clicked", () => {
    let nodesProps = {};
    Nodes.mockImplementation(props=>{
        nodesProps = props;
        return null;
    });

    const nodes = {};
    const handlers = defaultHandlers;

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    const deleteNodesButton = wrapper.getByText("Delete Node");

    fireEvent.click(deleteNodesButton);

    expect(nodesProps.isDeletingNode).toBe(true);
});

test("NodesCard stops Nodes component from being in delete mode when delete button is clicked twice", () => {
    let nodesProps = {};
    Nodes.mockImplementation(props=>{
        nodesProps = props;
        return null;
    });

    const nodes = {};
    const handlers = defaultHandlers;

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    const deleteNodesButton = wrapper.getByText("Delete Node");

    fireEvent.click(deleteNodesButton);
    fireEvent.click(deleteNodesButton);

    expect(nodesProps.isDeletingNode).toBe(false);
});

test("NodesCard stops Nodes component from being in delete mode when node is deleted", () => {
    let nodesProps = {};

    Nodes.mockImplementation(props=>{
        nodesProps = props;

        return null;
    });

    const nodes = {};
    const handlers = defaultHandlers;

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    const deleteNodesButton = wrapper.getByText("Delete Node");

    fireEvent.click(deleteNodesButton);
    act(()=>{
        nodesProps.handlers.deleteNode();
    });

    expect(nodesProps.isDeletingNode).toBe(false);
});

test("NodesCard passes deleteNode arguments successfully to parent handler when node is deleted", () => {
    let deleteNodeArgs;
    const deleteNodeExpectedArgs = [1, 2 ,3];

    Nodes.mockImplementation(props=>{
        return null;
    });

    const nodes = {};
    const handlers = {...defaultHandlers, deleteNode: (...props)=> deleteNodeArgs = props};

    const wrapper = render(<NodesCard nodes={nodes} handlers={handlers} size={{width: 100, heigh: 100}} />);

    const deleteNodesButton = wrapper.getByText("Delete Node");

    fireEvent.click(deleteNodesButton);
    handlers.deleteNode(...deleteNodeExpectedArgs);

    expect(deleteNodeArgs).toEqual(deleteNodeExpectedArgs);
});