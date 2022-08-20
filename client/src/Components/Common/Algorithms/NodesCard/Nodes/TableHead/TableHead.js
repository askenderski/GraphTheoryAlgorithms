import { Header } from "../Common";
import NodeDeleteButtonContainer from "./NodeDeleteButtonContainer";

function HorizontalVerticalHeader() {
    return <th/>;
}

function HorizontalHeader({index, isDeletingNode, deleteNode}) {
    return <Header index={index}>
            <NodeDeleteButtonContainer index={index} isDeletingNode={isDeletingNode} deleteNode={deleteNode}/>
        </Header>;
}

export function TableHead({isDeletingNode, handlers}) {
    const nodes = handlers.getNodesList();
    const nodeHeaders = nodes.map((node,i)=>
        <HorizontalHeader key={i} index={i}
        isDeletingNode={isDeletingNode} deleteNode={handlers.deleteNode.bind(undefined, node.id)} />
    );

    const horizontalHeaders = [
        <HorizontalVerticalHeader key="top-left"/>,
        ...nodeHeaders
    ];

    return <thead><tr>{horizontalHeaders}</tr></thead>;
}