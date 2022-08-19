import Nodes from "../Nodes/Nodes";
import useToggle from "../../../../../Hooks/useToggle";
import ToggleableComponent from "../../../../Common/ToggleableComponent/ToggleableComponent";
import style from "./NodesCardBody.module.css";
import { useContext } from "react";
import NodeContext from "../../../../../Contexts/Controller/Node";

export default function NodesCardBody() {
    const [isDeleting, toggleIsDeleting] = useToggle(false);
    const {nodesRecord, handlers} = useContext(NodeContext);

    return (
        <div className={style.cardBody}>
            <button onClick={handlers.addNode}>Add Node</button>
            <button onClick={toggleIsDeleting}>Delete Node</button>
            <ToggleableComponent
                isOn={nodesRecord.isDirected}
                toggleIsOn={handlers.toggleIsDirected}
                values={{ on: "Directed", off: "Undirected" }} />
            <ToggleableComponent
                isOn={nodesRecord.isWeighted}
                toggleIsOn={handlers.toggleIsWeighted}
                values={{ on: "Weighted", off: "Unweighted" }} />
            <Nodes nodes={nodesRecord} handlers={{
                setEdgeByIndex: handlers.setEdgeByIndex, deleteNode: (...props) => {
                    toggleIsDeleting();
                    handlers.deleteNode(...props);
                }
            }} isDeletingNode={isDeleting} />
        </div>
    );
}