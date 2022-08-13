import style from "./NodesCard.module.css";
import cardStyleModule from "../../../Common/Card/Card.module.css";
import useResizer from "../../../../Hooks/useResizer";
import NodesCardBody from "./NodesCardBody/NodesCardBody";
import { getCardStyle, getHeaderStyle } from "./Utilities/getStyles";
import useMover from "../../../../Hooks/useMover";

const defaultPosition = {x: 100, y: 100};
const defaultSize = {width: "300px", height: "300px"};

const headerClasses = `${cardStyleModule.header} ${style.unselectable}`;

export default function NodesCard({nodes, handlers}) {
    const {position, onMouseDown} = useMover(defaultPosition);
    const {size, ref: sizeRef} = useResizer(defaultSize);

    const cardStyle = getCardStyle({size, position});
    const headerStyle = getHeaderStyle({size, position});

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <div className={cardStyleModule.card} ref={sizeRef} style={cardStyle}>
            {/* onMouseDown is used for detecting when the header is being moved */}
            <div onMouseDown={onMouseDown} className={headerClasses} style={headerStyle}>
                Graph
            </div>
            {/* invisible header that has relative position and thus affects the flow */}
            <div style={headerStyle}/>
            <NodesCardBody nodes={nodes} handlers={handlers}/>
        </div>
    );
};