import Nodes from "./Nodes/Nodes";
import useToggle from "../../../../Hooks/useToggle";
import ToggleableComponent from "../../../Common/ToggleableComponent/ToggleableComponent";
import style from "./NodesCard.module.css";

export default function NodesCard({nodes, handlers, size}) {
    const [isDeleting, toggleIsDeleting] = useToggle(false);

    const cardStyle = {width: size.width, height: size.height};
    const headerStyle = getHeaderStyle({size});

    return (
        <div className={style.card} style={cardStyle}
             onScrollCapture={handlers.onScrollCapture}
        >
            <div className={style.cardHeader} style={headerStyle}>Graph</div>
            <div className={style.cardBody}>
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
        </div>
    );
};

function getHeaderStyle({size}) {
    const {height} = size;
    
    const heightAsNum = Number(height.substring(0, height.length-2));
    const headerHeight = Math.max(heightAsNum * 0.2, 20);

    return {
        height: headerHeight
    };
}