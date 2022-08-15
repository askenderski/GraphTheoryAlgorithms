export function getHandlers(nodes, setNodes) {
    function addNode() {
        setNodes(nodes => nodes.addNode());
    }

    function setEdge({to, from}, val) {
        setNodes(nodes => nodes.setEdge({to, from}, val));
    }

    function deleteNode(i) {
        setNodes(nodes => nodes.deleteNode(i));
    }

    function toggleIsDirected() {
        setNodes(nodes => nodes.toggleIsDirected());
    }

    function toggleIsWeighted() {
        setNodes(nodes => nodes.toggleIsWeighted());
    }

    return {addNode, setEdge, deleteNode, toggleIsDirected, toggleIsWeighted};
};