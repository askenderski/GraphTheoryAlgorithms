import Nodes from "../Nodes/Nodes";
import useToggle from "../../../../../Hooks/useToggle";
import ToggleableComponent from "../../../../Common/ToggleableComponent/ToggleableComponent";
import style from "./NodesCardBody.module.css";
import { useContext } from "react";
import NodeContext from "../../../../../Contexts/Controller/Node";
import useNodesHandlers from "../../../../../Hooks/useNodesHandlers";

export default function NodesCardBody() {
    const [isDeleting, toggleIsDeleting] = useToggle(false);
    const handlers = useNodesHandlers();

    return (
        <div className={style.cardBody}>
            <button onClick={handlers.addNode}>Add Node</button>
            <button onClick={toggleIsDeleting}>Delete Node</button>
            <ToggleableComponent
                isOn={handlers.getIsDirected()}
                toggleIsOn={handlers.toggleIsDirected}
                values={{ on: "Directed", off: "Undirected" }} />
            <ToggleableComponent
                isOn={handlers.getIsWeighted()}
                toggleIsOn={handlers.toggleIsWeighted}
                values={{ on: "Weighted", off: "Unweighted" }} />
            <Nodes handlers={{
                ...handlers, deleteNode: (...props) => {
                    toggleIsDeleting();
                    handlers.deleteNode(...props);
                }
            }} isDeletingNode={isDeleting} />
        </div>
    );
}