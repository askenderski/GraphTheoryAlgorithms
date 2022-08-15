import GraphContainer from "./GraphContainer/GraphContainer";
import style from "./GraphCard.module.css";
import cardStyleModule from "../../../Common/Card/Card.module.css";
import useMover from "../../../../Hooks/useMover";
import { getCardStyle, getHeaderStyle } from "../NodesCard/Utilities/getStyles";
import useResizer from "../../../../Hooks/useResizer";

const defaultPosition = {x: 300, y: 300};
const defaultSize = {width: "300px", height: "300px"};

export default function GraphCard({nodes}) {
    const {position, onMouseDown} = useMover(defaultPosition);
    const {ref, size} = useResizer(defaultSize);

    const headerStyle = getHeaderStyle({size, position});
    const cardStyle = getCardStyle({size, position});

    return (
        <div ref={ref} className={`${style.card} ${cardStyleModule.card}`} style={cardStyle}>
            <div className={cardStyleModule.header} onMouseDown={onMouseDown} style={headerStyle}>Graph</div>
            <div style={{...headerStyle, flexShrink: 0}}/>
            <div style={{flexGrow: 1}}><GraphContainer nodes={nodes}/></div>
        </div>
    );
}