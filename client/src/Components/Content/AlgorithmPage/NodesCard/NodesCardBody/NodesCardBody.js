import Nodes from "../Nodes/Nodes";
import useToggle from "../../../../../Hooks/useToggle";
import ToggleableComponent from "../../../../Common/ToggleableComponent/ToggleableComponent";
import style from "./NodesCardBody.module.css";

export default function NodesCardBody({ nodes, handlers }) {
    const [isDeleting, toggleIsDeleting] = useToggle(false);

    return (
        <div className={style.cardBody}>
            <button onClick={handlers.addNode}>Add Node</button>
            <button onClick={toggleIsDeleting}>Delete Node</button>
            <ToggleableComponent
                isOn={nodes.isDirected}
                toggleIsOn={handlers.toggleIsDirected}
                values={{ on: "Directed", off: "Undirected" }} />
            <ToggleableComponent
                isOn={nodes.isWeighted}
                toggleIsOn={handlers.toggleIsWeighted}
                values={{ on: "Weighted", off: "Unweighted" }} />
            <Nodes nodes={nodes} handlers={{
                setEdge: handlers.setEdge, deleteNode: (...props) => {
                    toggleIsDeleting();
                    handlers.deleteNodeByIndex(...props);
                }
            }} isDeletingNode={isDeleting} />
        </div>
    );
}
