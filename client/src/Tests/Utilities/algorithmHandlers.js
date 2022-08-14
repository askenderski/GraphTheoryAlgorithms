import {List} from "immutable";

export function getHandlers(nodes, setNodes) {
    function addNode() {
        setNodes(nodes => nodes.addNode());
    }

    function setNode({i, j}, val) {
        setNodes(nodes => nodes.setNode({i, j}, val));
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

    return {addNode, setNode, deleteNode, toggleIsDirected, toggleIsWeighted};
};