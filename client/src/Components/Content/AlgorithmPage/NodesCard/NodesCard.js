import Nodes from "./Nodes/Nodes";
import useToggle from "../../../../Hooks/useToggle";

export default function NodesCard({nodes, handlers}) {
    const [isDeleting, toggleIsDeleting] = useToggle(false);

    return (
        <>
            <button onClick={handlers.addNode}>Add Node</button>
            <button onClick={toggleIsDeleting}>Delete Node</button>
            <Nodes nodes={nodes} handlers={{setNode: handlers.setNode, deleteNode: (...props) => {
                toggleIsDeleting();
                handlers.deleteNode(...props);
                }}} isDeletingNode={isDeleting} />
        </>
    );
};