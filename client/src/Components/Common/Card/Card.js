import style from "./Card.module.css";
import useResizer from "../../../Hooks/useResizer";
import { getCardStyle, getHeaderStyle } from "../../../Utilities/getCardStyles";
import useMover from "../../../Hooks/useMover";

const headerClasses = `${style.header} ${style.headerMover} ${style.unselectable}`;

export default function Card({defaultPosition, defaultSize, headerContent, children}) {
    const {position, onMouseDown} = useMover(defaultPosition);
    const {size, ref: sizeRef} = useResizer(defaultSize);

    const cardStyle = getCardStyle({size, position});
    const headerStyle = getHeaderStyle({size, position});

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <div className={style.card} ref={sizeRef} style={cardStyle}>
            {/* onMouseDown is used for detecting when the header is being moved */}
            <div onMouseDown={onMouseDown} className={headerClasses} style={headerStyle}>
                {headerContent}
            </div>
            {/* invisible header that has relative position and thus affects the flow */}
            <div style={headerStyle} className={style.header}/>
            {children}
        </div>
    );
};