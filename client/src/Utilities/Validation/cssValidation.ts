export const isValidCssColor = function (strColor: string) {
    const s = new Option().style;
    s.color = strColor;

    return s.color !== '';
}