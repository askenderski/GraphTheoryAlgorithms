import { INodesHandlers } from "Hooks/IHandlers";
import { Header } from "../Common";
import NodeDeleteButtonContainer from "./NodeDeleteButtonContainer";

function HorizontalVerticalHeader() {
    return <th/>;
}

function HorizontalHeader(
    {label, isDeletingNode, deleteNode}: {label: string, isDeletingNode: boolean, deleteNode:()=>void}
) {
    return <Header label={label}>
            <NodeDeleteButtonContainer label={label} isDeletingNode={isDeletingNode} deleteNode={deleteNode}/>
        </Header>;
}

export function TableHead({isDeletingNode, handlers}: {isDeletingNode: boolean, handlers: INodesHandlers}) {
    const nodes = handlers.getNodesList();
    const nodeHeaders = nodes.map((node,i)=>
        <HorizontalHeader key={i} label={handlers.getNodeLabel(node)}
        isDeletingNode={isDeletingNode} deleteNode={handlers.deleteNode.bind(undefined, node.get("id"))} />
    );

    const horizontalHeaders = [
        <HorizontalVerticalHeader key="top-left"/>,
        ...nodeHeaders
    ];

    return <thead><tr>{horizontalHeaders}</tr></thead>;
}