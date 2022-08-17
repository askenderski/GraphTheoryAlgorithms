function NodeDeleteButton({index, deleteNode}) {
    return <button data-testid={`delete-${index}`} onClick={() => deleteNode(index)}>X</button>
}

export default function NodeDeleteButtonContainer({index, deleteNode, isDeletingNode}) {
    if (isDeletingNode) {
        return <NodeDeleteButton index={index} deleteNode={deleteNode} />;
    }
    
    return null;
}