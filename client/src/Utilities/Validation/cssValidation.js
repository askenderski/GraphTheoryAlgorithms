export const isValidCssColor = function (strColor) {
    const s = new Option().style;
    s.color = strColor;

    return s.color !== '';
}