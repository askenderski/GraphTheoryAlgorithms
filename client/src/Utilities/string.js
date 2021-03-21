function getBiggestFormationUnderLength(stringAsArrOfWordsAndSeparators, maxLength) {
    let stillAddingText = true;

    return stringAsArrOfWordsAndSeparators.reduce((acc, curElement) => {
        //If we are still adding text and the current length plus the length of the next word or separator makes the text
        // shorter than the max length without the three dots
        if (stillAddingText && acc.length + curElement.length <= maxLength) {
            return acc + curElement;
        }

        //If we do not add the current word or separator, we are no longer adding anything
        stillAddingText = false;
        return acc;
    }, "");
}

function validateLengthOptions(lengthOptions) {
    if (typeof lengthOptions?.minLength === "number" && lengthOptions?.minLength < 0) {
        throw new Error("Minimum length must be a non-negative number");
    }

    if (typeof lengthOptions?.maxLength === "number" && lengthOptions?.maxLength < 0) {
        throw new Error("Maximum length must be a non-negative number");
    }
}

function getMinAndMaxLengths(text, lengthOptions) {
    const minLength = lengthOptions?.minLength || 0;
    let maxLength = lengthOptions?.maxLength || text.length;

    //If min length given is bigger than max length, max length is set to be equal to the given min length
    //If only one of them is given or none are given, the ones not given are set to the defaults
    if (lengthOptions?.maxLength !== undefined && lengthOptions?.maxLength !== undefined) {
        maxLength = Math.max(minLength, maxLength);
    }

    return [minLength, maxLength];
}

export const getWordsCutOffAtLength = function (text, lengthOptions) {
    validateLengthOptions(lengthOptions);

    const [minLength, maxLength] = getMinAndMaxLengths(text, lengthOptions);

    if (text.length <= maxLength) {
        return text;
    }

    //If the text is bigger than the max length and the max length is smaller than or equal to three, we need to return dots
    if (maxLength <= 3) {
        return ".".repeat(maxLength);
    }

    const maxLengthBeforeAddingDots = maxLength - 3;

    //() defines a capturing group and is used to make sure that the split does not omit the separators.
    // The separators are [^a-zA-Z0-9]+ which means anything other than letters and digits of length at least 1
    const stringAsArrOfWordsAndSeparators = text.split(/([^a-zA-Z0-9]+)/);
    //By subtracting 3 from the max length, we make sure we will find the biggest word formation which will be under max length
    // when we add the 3 dots
    const biggestFormationUnderMaxLengthWithThreeDotsAdded =
        getBiggestFormationUnderLength(stringAsArrOfWordsAndSeparators, maxLengthBeforeAddingDots);

    //If the biggest word formation (which is still within max length when three dots are added) will be bigger than the minimum
    // length after we add the three dots, we have found the solution (and a new word or separator would make the word formation
    // bigger than the maximum by the definition of biggest word formation
    if (biggestFormationUnderMaxLengthWithThreeDotsAdded.length >= minLength - 3) {
        return biggestFormationUnderMaxLengthWithThreeDotsAdded + "...";
    }

    //If there is no word formation to make text between min and max length, we return the text cutoff just before the max
    // length and add the three dots
    return text.substring(0, maxLengthBeforeAddingDots) + "...";
}