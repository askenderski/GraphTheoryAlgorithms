import {fireEvent, render} from "@testing-library/react";
import Nodes from "../../../../Components/Content/AlgorithmPage/NodesCard/Nodes/Nodes";
import {useState} from "react";
import {Record, List} from "immutable";

function getNodeMatrix(nodeCount, getCellValue) {
    return List.of(
        ...new Array(nodeCount).fill(false)
            .map(
                (_, i) => List.of(
                    ...new Array(nodeCount).fill(false).map((_, j) => getCellValue(i, j))
                )
            )
    );
}

function getNodesByCellValueFunction(getCellValue) {
    const nodesRecord = Record({nodeCount: 5, nodeMatrix: getNodeMatrix(5, getCellValue), isWeighted: true});

    nodesRecord.prototype.getNode = function ({i, j}) {
        const matrix = this.get("nodeMatrix");

        return matrix.get(i).get(j);
    };

    const nodes = new nodesRecord();

    return nodes;
}

function getNodes() {
    const nodes = getNodesByCellValueFunction((i,j)=>Math.floor(Math.random() * 100));

    return nodes;
}

function getNodesWrapper(
    {
        nodes = getNodes(),
        isDeletingNode = false,
        handlers: {setNode = () => {}, deleteNode = () => {}} = {}
    } = {}) {

    const nodesWrapper = render(<Nodes nodes={nodes} handlers={{setNode, deleteNode}} isDeletingNode={isDeletingNode} />);

    return nodesWrapper;
}

test("Nodes renders correct table cells", () => {
    const nodes = getNodes();
    const nodesWrapper = getNodesWrapper({nodes});

    const tableRowHTMLElements = Array.from(
        nodesWrapper.container.getElementsByTagName("tr")
    )
        //first row is skipped as it contains headers
        .slice(1);

    const tableRows = tableRowHTMLElements
        .map(row=> Array.from(row.getElementsByTagName("td")));

    tableRows.forEach((tableRow, rowIndex)=>{
        tableRow.forEach((tableElement, colIndex)=>{
            const cellText = tableElement.querySelector("input").value;
            const nodeContent = nodes.getNode({i: rowIndex, j: colIndex});

            expect(cellText).toContain(nodeContent.toString());
        });
    });
});

test("Nodes renders correct horizontal headers", () => {
    const nodesWrapper = getNodesWrapper();

    //the first tr is the one with the horizontal headers
    const headers = Array.from(
        nodesWrapper.container.querySelector("tr")
            .getElementsByTagName("th")
    )
        //first header is empty and so is skipped
        .slice(1);

    headers.forEach((header, nodeIndex)=>{
        expect(header.textContent).toContain(nodeIndex);
    });
});

test("Nodes renders correct vertical headers", () => {
    const nodesWrapper = getNodesWrapper();

    const headers = Array.from(
        nodesWrapper.container.getElementsByTagName("tr")
    )
        //the first row is skipped as it contains the horizontal headers
        .slice(1)
        .map(row=>row.querySelector("th"));

    headers.forEach((header, nodeIndex)=>{
        expect(header.textContent).toContain(nodeIndex);
    });
});

function Component() {
    const [nodes, setNodes] = useState(getNodesByCellValueFunction((i,j)=>i+j));

    return <Nodes nodes={nodes} handlers={{setNode: ({i, j}, val) => {
            setNodes(oldNodes=> oldNodes.setIn(["nodeMatrix", i, j], val));
        }}}/>;
}

test("Nodes correctly changes cell value", () => {
    const wrapper = render(<Component />);

    //There are 5 nodes, so there is just one node with value of maxInd + maxInd = 4 + 4
    const cellInput = wrapper.getByDisplayValue(4+4);

    fireEvent.change(cellInput, {target: { value: "1000" } });

    expect(Number(cellInput.value)).toBe(1000);
});

test("Nodes correctly changes cell value multiple times", () => {
    const wrapper = render(<Component />);

    //There are 5 nodes, so there is just one node with value of maxInd + maxInd = 4 + 4
    const cellInput = wrapper.getByDisplayValue(4+4);

    fireEvent.change(cellInput, {target: { value: "1000" } });

    fireEvent.change(cellInput, {target: { value: "2000" } });

    expect(Number(cellInput.value)).toBe(2000);
});

test("Nodes doesn't render X buttons on node headers by default", () => {
    const nodesWrapper = getNodesWrapper();

    const headers = Array.from(
        nodesWrapper.container.getElementsByTagName("th")
    );

    headers.forEach(header=>{
        expect(header.textContent.toLowerCase()).not.toContain("x");
    });
});

test("Nodes component deletes one node when in delete mode and node header X is clicked on", () => {
    const deleteNode = jest.fn();
    const nodesWrapper = getNodesWrapper({
        handlers: {deleteNode},
        isDeletingNode: true
    });

    const headerDelete = nodesWrapper.getByTestId("delete-0");

    fireEvent.click(headerDelete);
    expect(deleteNode.mock.calls[0]).toEqual([0]);
    expect(deleteNode.mock.calls).toHaveLength(1);
});