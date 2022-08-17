import GraphContainer from "./GraphContainer/GraphContainer";
import Card from "../../../Common/Card/Card";

const defaultPosition = {x: 300, y: 300};
const defaultSize = {width: "300px", height: "300px"};

export default function GraphCard({nodes}) {
    return (
        <Card headerContent={"Graph"} defaultPosition={defaultPosition} defaultSize={defaultSize}>
            <div style={{flexGrow: 1}}><GraphContainer nodes={nodes}/></div>
        </Card>
    );
}