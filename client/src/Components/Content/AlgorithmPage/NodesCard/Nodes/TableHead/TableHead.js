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

export function TableHead({nodeCount, isDeletingNode, deleteNode}) {
    const iterableNodeHeaderArray = new Array(nodeCount).fill(false);
    const nodeHeaders = iterableNodeHeaderArray.map((_,i)=>
        <HorizontalHeader key={i} index={i} isDeletingNode={isDeletingNode} deleteNode={deleteNode} />
    );

    const horizontalHeaders = [
        <HorizontalVerticalHeader key="top-left"/>,
        ...nodeHeaders
    ];

    return <thead><tr>{horizontalHeaders}</tr></thead>;
}