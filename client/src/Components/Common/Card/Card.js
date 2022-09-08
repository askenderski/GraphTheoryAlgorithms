import style from "./Card.module.css";
import useResizer from "../../../Hooks/useResizer";
import { getCardStyle, getHeaderStyle, getHeaderMoverStyle } from "../../../Utilities/getCardStyles";
import useMover from "../../../Hooks/useMover";

const headerClasses = `${style.header} ${style.headerMover} ${style.unselectable}`;

export default function Card(props) {
    const {defaultPosition, defaultSize, headerContent, cardStyle: propCardStyle, children} = props;
    const {movement = {}} = props;
    const {fixedPosition : isFixedPositon = true} = movement;
    const {resize="both"} = props;

    const {position, ref: positionRef, onMouseDown} = useMover(defaultPosition, movement);
    const {size, ref: sizeRef} = useResizer(defaultSize);

    let cardStyle, headerMoverStyle, headerStyle;

    cardStyle = getCardStyle({size, position, isFixedPositon, resize});
    headerMoverStyle = getHeaderMoverStyle({size, position, isFixedPositon, resize});
    headerStyle = getHeaderStyle({size, position, resize});

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <div className={style.card} ref={sizeRef} style={{...cardStyle, ...propCardStyle}}>
            {/* onMouseDown is used for detecting when the header is being moved */}
            <div onMouseDown={onMouseDown} ref={positionRef} className={headerClasses} style={headerMoverStyle}>
                {headerContent}
            </div>
            {/* invisible header that has relative position and thus affects the flow */}
            {isFixedPositon ? <div style={headerStyle} className={style.header}/> : null}
            {children}
        </div>
    );
};