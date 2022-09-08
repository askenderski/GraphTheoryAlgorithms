import Card from "../../../Common/Card/Card";
import VariablesController from "./VariablesController";

const defaultPosition = {x: 100, y: 100};
const defaultSize = {width: "300px", height: "300px"};

export default function VariablesControllerCard({parsers}) {
    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <Card headerContent={"Variables"} defaultPosition={defaultPosition} defaultSize={defaultSize}>
            <VariablesController parsers={parsers}/>
        </Card>
    );
};