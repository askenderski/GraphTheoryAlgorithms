const getPosition = fixedPosition => fixedPosition ? "fixed" : "static";

export function getCardStyle({size, position, fixedPosition, resize}) {
    return {
        width: size.width, height: size.height, left: position?.x, top: position?.y,
        position: getPosition(fixedPosition), resize
    };
};

export function getHeaderMoverStyle({size, position, fixedPosition}) {
    return {...getHeaderStyle({size, position}), position: getPosition(fixedPosition)};
};

export function getHeaderStyle({size, position}) {
    const {height} = size;
    
    const heightAsNum = Number(height.substring(0, height.length-2));
    const headerHeight = Math.max(heightAsNum * 0.2, 30);

    return {
        height: headerHeight,
        width: size.width,
        left: position?.x,
        top: position?.y
    };
};