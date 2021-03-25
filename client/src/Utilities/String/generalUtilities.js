export const getIndexOrLength = function (string, index) {
    if (index < 0 || index >= string.length) return string.length;

    return index;
}