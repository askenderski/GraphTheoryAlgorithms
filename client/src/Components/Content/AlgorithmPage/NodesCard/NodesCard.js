import Nodes from "./Nodes/Nodes";
import useToggle from "../../../../Hooks/useToggle";
import ToggleableComponent from "../../../Common/ToggleableComponent/ToggleableComponent";
import style from "./AlgorithmRouting.module.css";

export default function NodesCard({nodes, handlers, size}) {
    const [isDeleting, toggleIsDeleting] = useToggle(false);

    return (
        <div className={style.card} style={{width: size.width, height: size.height}}
             onScrollCapture={handlers.onScrollCapture}
        >
            <button onClick={handlers.addNode}>Add Node</button>
            <button onClick={toggleIsDeleting}>Delete Node</button>
            <ToggleableComponent
                isOn={nodes.isDirected}
                toggleIsOn={handlers.toggleIsDirected}
                values={{on: "Directed", off: "Undirected"}}
            />
            <ToggleableComponent
                isOn={nodes.isWeighted}
                toggleIsOn={handlers.toggleIsWeighted}
                values={{on: "Weighted", off: "Unweighted"}}
            />
            <Nodes nodes={nodes} handlers={{setNode: handlers.setNode, deleteNode: (...props) => {
                    toggleIsDeleting();
                    handlers.deleteNode(...props);
                }}} isDeletingNode={isDeleting} />
        </div>
    );
};