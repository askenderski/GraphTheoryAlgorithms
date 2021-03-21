import {getWordsCutOffAtLength} from "../../Utilities/string";

//Word formation means succession of words and separators

describe("getWordsCutOffAtLength", () => {
    test("When not given a min length, function behaves as though it is 0", () => {
        const text = "a".repeat(1);

        expect(getWordsCutOffAtLength(text, {maxLength: 5})).toEqual(text);
    });

    test("When not given a max length, function behaves as though it is equal to the text's length", () => {
        const text = "a".repeat(1);

        expect(getWordsCutOffAtLength(text, {minLength: 1})).toEqual(text);
    });

    test("Text shorter than min length is kept as is", () => {
        const text = "a".repeat(1);

        expect(getWordsCutOffAtLength(text, {minLength: 2})).toEqual(text);
    });

    test("Text equal to min length is kept as is", () => {
        const text = "a".repeat(1);

        expect(getWordsCutOffAtLength(text, {minLength: 1})).toEqual(text);
    });

    test("Text longer than min length but shorter than max length is kept as is", () => {
        const text = "a".repeat(3);

        expect(getWordsCutOffAtLength(text, {minLength: 2, maxLength: 4})).toEqual(text);
    });

    test("Text longer than min length but equal to max length is kept as is", () => {
        const text = "a".repeat(2);

        expect(getWordsCutOffAtLength(text, {minLength: 1, maxLength: 2})).toEqual(text);
    });

    test("Text longer than max length with word formation which makes text between min and max length without ... (inclusive) is returned as biggest such formation plus ...", () => {
        const text = "a a a a";

        expect(getWordsCutOffAtLength(text, {minLength: 1, maxLength: 6})).toEqual("a a...");
    });

    test("Text longer than max length which has a word formation which makes text above min length when ... are added and that formation plus ... is under max length but has no word formation which takes text between min and max lengths returns longest such formation plus ...", () => {
        const text = "a aaa";

        expect(getWordsCutOffAtLength(text, {minLength: 3, maxLength: 4})).toEqual("a...");
    });

    test("Text longer than max length whose only word formations make text under min length with or without ... or above max length without ... (inclusive) is returned as the text continued until max length minus three plus ...", () => {
        const text = "a aaaaaaa";

        expect(getWordsCutOffAtLength(text, {minLength: 6, maxLength: 6})).toEqual("a a...");
    });

    test("Text longer than max length, which is equal to 3, is returned as 3 dots", () => {
        const text = "a".repeat(4);

        expect(getWordsCutOffAtLength(text, {maxLength: 3})).toEqual("...");
    });

    test("Text longer than max length, which is smaller than 3, is returned as number of dots equal to max length", () => {
        const text = "a".repeat(4);

        expect(getWordsCutOffAtLength(text, {maxLength: 2})).toEqual("..");
    });

    test("Minimum length smaller than zero causes error", () => {
        expect(() => getWordsCutOffAtLength("", {minLength: -1}))
            .toThrow("Minimum length must be a non-negative number");
    });

    test("Maximum length smaller than zero causes error", () => {
        expect(() => getWordsCutOffAtLength("", {maxLength: -1}))
            .toThrow("Maximum length must be a non-negative number");
    });

    test("Saturation testing", () => {
        expect(getWordsCutOffAtLength("aaaaa", {minLength: 0})).toEqual("aaaaa");
        expect(getWordsCutOffAtLength("aaaaa", {maxLength: 10})).toEqual("aaaaa");
        expect(getWordsCutOffAtLength("aaaaa", {maxLength: 3})).toEqual("...");
        expect(getWordsCutOffAtLength("aaaaa", {maxLength: 4})).toEqual("...");
        expect(getWordsCutOffAtLength("aaaaa", {minLength: 4, maxLength: 4})).toEqual("a...");
        expect(getWordsCutOffAtLength("aa aaa", {maxLength: 4})).toEqual("...");
        expect(getWordsCutOffAtLength("aa aaa", {maxLength: 5})).toEqual("aa...");
        expect(getWordsCutOffAtLength("aa aaa", {minLength: 5, maxLength: 5})).toEqual("aa...");
        expect(getWordsCutOffAtLength("aa aaaa", {maxLength: 6})).toEqual("aa ...");
        expect(getWordsCutOffAtLength("aa aaaaa", {maxLength: 7})).toEqual("aa ...");
    });
});