import style from "./Card.module.css";
import useResizer, { ISize } from "../../../Hooks/useResizer";
import { getCardStyle, getHeaderStyle, getHeaderMoverStyle } from "../../../Utilities/getCardStyles";
import useMover from "../../../Hooks/useMover";

interface ICardProps extends React.PropsWithChildren {
    defaultPosition?: {x: number, y: number},
    defaultSize?: ISize,
    headerContent: string,
    cardStyle?: React.CSSProperties,
    movement?: {fixedPosition: boolean},
    resize?: string
}

const headerClasses = `${style.header} ${style.headerMover} ${style.unselectable}`;

export default function Card(props: ICardProps) {
    const {defaultPosition, defaultSize, headerContent, cardStyle: propCardStyle, children} = props;
    const {movement = {fixedPosition: true}} = props;
    const {fixedPosition : isFixedPosition = true} = movement;
    const {resize="both"} = props;

    const {position, ref: positionRef, onMouseDown} = useMover(defaultPosition, movement);
    const {size, ref: sizeRef} = useResizer(defaultSize);

    let cardStyle, headerMoverStyle, headerStyle;

    cardStyle = getCardStyle({size, position, isFixedPosition, resize});
    headerMoverStyle = getHeaderMoverStyle({size, position, isFixedPosition, resize});
    headerStyle = getHeaderStyle({size, position, resize});

    return (
        // sizeRef is used for tracking card size and therefore changing the size of the header
        <div className={style.card} ref={sizeRef as React.Ref<HTMLDivElement>}
        style={{...cardStyle, ...propCardStyle} as React.CSSProperties}>
            {/* onMouseDown is used for detecting when the header is being moved */}
            <div onMouseDown={onMouseDown} ref={positionRef as React.Ref<HTMLDivElement>}
            className={headerClasses} style={headerMoverStyle as React.CSSProperties}>
                {headerContent}
            </div>
            {/* invisible header that has relative position and thus affects the flow */}
            {isFixedPosition ? <div style={headerStyle} className={style.header}/> : null}
            {children}
        </div>
    );
};