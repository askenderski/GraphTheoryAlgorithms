import {render} from "@testing-library/react";
import Nodes from "../../../Components/Content/Nodes/Nodes";

function getNodes() {
    const nodes = {
        nodeCount: 5,
        get({i, j}) {
            return this.nodeMatrix[i][j];
        }
    };

    nodes.nodeMatrix = new Array(nodes.nodeCount).fill(false)
        .map(
            () => new Array(nodes.nodeCount).fill(false).map(() => Math.floor(Math.random() * 100))
        );

    return nodes;
}

function getNodesWrapper(nodes = getNodes()) {
    const nodesWrapper = render(<Nodes nodes={nodes}/>);

    return nodesWrapper;
}

test("Nodes renders correct table cells", () => {
    const nodes = getNodes();
    const nodesWrapper = getNodesWrapper(nodes);

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
            const nodeContent = nodes.get({i: rowIndex, j: colIndex});

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
    );

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