export const getIndexOrLength = function (string: string, index: number) {
    if (index < 0 || index >= string.length) return string.length;

    return index;
}