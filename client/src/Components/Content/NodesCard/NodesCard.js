import Nodes from "../Nodes/Nodes";

export default function NodesCard({nodes, handlers}) {
    return (
        <>
            <button onClick={handlers.addNode}>Add Node</button>
            <Nodes nodes={nodes} handlers={{setNode: handlers.setNode}} />
        </>
    );
};