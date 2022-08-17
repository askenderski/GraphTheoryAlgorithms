import { Header } from "../Common";
import NodeDeleteButtonContainer from "./NodeDeleteButtonContainer";

function HorizontalVerticalHeader() {
    return <th key="top-left" />;
}

function HorizontalHeader({index, isDeletingNode, deleteNode}) {
    return <Header index={index}>
            <NodeDeleteButtonContainer index={index} isDeletingNode={isDeletingNode} deleteNode={deleteNode}/>
        </Header>;
}

export function TableHead({nodeCount, isDeletingNode, deleteNode}) {
    const iterableNodeHeaderArray = new Array(nodeCount).fill(false);
    const nodeHeaders = iterableNodeHeaderArray.map((_,i)=>
        <HorizontalHeader index={i} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
    );

    const horizontalHeaders = [
        <HorizontalVerticalHeader />,
        ...nodeHeaders
    ];

    return <thead><tr>{horizontalHeaders}</tr></thead>;
}