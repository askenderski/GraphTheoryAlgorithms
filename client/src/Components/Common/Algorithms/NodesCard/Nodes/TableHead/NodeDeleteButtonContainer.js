function NodeDeleteButton({label, deleteNode}) {
    return <button data-testid={`delete-${label}`} onClick={() => deleteNode()}>X</button>
}

export default function NodeDeleteButtonContainer({label, deleteNode, isDeletingNode}) {
    if (isDeletingNode) {
        return <NodeDeleteButton label={label} deleteNode={deleteNode} />;
    }
    
    return null;
}