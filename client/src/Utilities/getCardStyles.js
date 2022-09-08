const getPosition = isFixedPositon => isFixedPositon ? "fixed" : "static";

export function getCardStyle({size, position, isFixedPositon, resize}) {
    return {
        width: resize === "both" || resize === "horizontal" ? size.width : undefined,
        height: resize === "both" || resize === "vertical" ? size.height : undefined,
        left: position?.x, top: position?.y,
        position: getPosition(isFixedPositon), resize
    };
};

export function getHeaderMoverStyle({size, position, isFixedPositon, resize}) {
    return {...getHeaderStyle({size, position, resize}), position: getPosition(isFixedPositon)};
};

export function getHeaderStyle({size, position, resize}) {
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