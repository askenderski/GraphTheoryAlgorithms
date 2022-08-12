export function getCardStyle({size, position}) {
    return {
        width: size.width, height: size.height, left: position.x, top: position.y
    };
};
export function getHeaderStyle({size, position}) {
    const {height} = size;
    
    const heightAsNum = Number(height.substring(0, height.length-2));
    const headerHeight = Math.max(heightAsNum * 0.2, 30);

    return {
        height: headerHeight,
        width: size.width,
        left: position.x,
        top: position.y
    };
};