const getPosition = (isFixedPosition: boolean) => isFixedPosition ? "fixed" : "static";

interface IStyle {
    size: {height: string, width: string},
    position?: {x: number, y: number},
    resize: string
}

interface ICardStyle extends IStyle {
    isFixedPosition: boolean
}

interface IHeaderMoverStyle extends IStyle {
    isFixedPosition: boolean
}

interface IHeaderStyle extends IStyle {}

export function getCardStyle({size, position, isFixedPosition, resize}: ICardStyle) {
    return {
        width: resize === "both" || resize === "horizontal" ? size.width : undefined,
        height: resize === "both" || resize === "vertical" ? size.height : undefined,
        left: position?.x, top: position?.y,
        position: getPosition(isFixedPosition), resize
    };
};

export function getHeaderMoverStyle({size, position, isFixedPosition, resize}: IHeaderMoverStyle) {
    return {...getHeaderStyle({size, position, resize}), position: getPosition(isFixedPosition)};
};

export function getHeaderStyle({size, position, resize}: IHeaderStyle) {
    const {height = "0px"} = size;
    
    const heightAsNum = Number(height.substring(0, height.length-2));
    const headerHeight = Math.max(heightAsNum * 0.2, 30);

    return {
        height: headerHeight,
        width: resize === "both" || resize === "horizontal" ? size.width : undefined,
        left: position?.x,
        top: position?.y
    };
};