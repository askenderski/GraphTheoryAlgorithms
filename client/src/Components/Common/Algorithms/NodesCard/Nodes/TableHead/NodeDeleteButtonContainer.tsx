function NodeDeleteButton({label, deleteNode}: {label:string, deleteNode:()=>void}) {
    return <button data-testid={`delete-${label}`} onClick={() => deleteNode()}>X</button>
}

export default function NodeDeleteButtonContainer(
    {label, deleteNode, isDeletingNode}: {label:string, deleteNode:()=>void, isDeletingNode: boolean}
) {
    if (isDeletingNode) {
        return <NodeDeleteButton label={label} deleteNode={deleteNode} />;
    }
    
    return null;
}