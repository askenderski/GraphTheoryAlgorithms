import style from "./Card.module.css";
import useResizer from "../../../Hooks/useResizer";
import { getCardStyle, getHeaderStyle, getHeaderMoverStyle } from "../../../Utilities/getCardStyles";
import useMover from "../../../Hooks/useMover";
import { useEffect, useState } from "react";

const headerClasses = `${style.header} ${style.headerMover} ${style.unselectable}`;

export default function Card(props) {
    const {defaultPosition, defaultSize, headerContent, children} = props;
    const {movement = {}} = props;
    const {fixedPosition = true} = movement;
    const {resize="both"} = props;

    const {position, ref: positionRef, onMouseDown} = useMover(defaultPosition, movement);
    const {size, ref: sizeRef} = useResizer(defaultSize);

    const [hasLoaded, setHasLoaded] = useState(!!defaultSize);

    useEffect(()=>{
        if (!size.height || !size.width) return;
        
        setHasLoaded(true);
    }, [size]);

    let cardStyle, headerMoverStyle, headerStyle;

    if (hasLoaded) {
        cardStyle = getCardStyle({size, position, fixedPosition, resize});
        headerMoverStyle = getHeaderMoverStyle({size, position, fixedPosition});
        headerStyle = getHeaderStyle({size, position});
    }

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <div className={style.card} ref={sizeRef} style={cardStyle}>
            {/* onMouseDown is used for detecting when the header is being moved */}
            <div onMouseDown={onMouseDown} ref={positionRef} className={headerClasses} style={headerMoverStyle}>
                {headerContent}
            </div>
            {/* invisible header that has relative position and thus affects the flow */}
            {fixedPosition ? <div style={headerStyle} className={style.header}/> : null}
            {children}
        </div>
    );
};