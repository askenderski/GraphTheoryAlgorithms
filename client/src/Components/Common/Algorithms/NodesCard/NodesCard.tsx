import Card from "../../Card/Card";
import NodesCardBody from "./NodesCardBody/NodesCardBody";

const defaultPosition = {x: 100, y: 100};
const defaultSize = {width: "300px", height: "300px"};

export default function NodesCard() {
    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card headerContent={"Graph"} defaultPosition={defaultPosition} defaultSize={defaultSize}>
            <NodesCardBody/>
        </Card>
    );
};