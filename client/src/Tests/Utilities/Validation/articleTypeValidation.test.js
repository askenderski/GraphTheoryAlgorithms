import {validateArticleType} from "../../../Utilities/Validation/articleTypeValidation";
import {ArticleTypes} from "../../../Data/articleTypes";

test("Valid article passes", () => {
    const errorMessage = "Type is invalid";
    const errorType = Error;
    const validate = () => validateArticleType(ArticleTypes.General, {errorType, message: errorMessage});

    expect(validate).not.toThrow();
});

test("Invalid article type throws error", () => {
    const errorMessage = "Type is invalid";
    const errorType = Error;
    const validate = () => validateArticleType({}, {errorType, message: errorMessage});

    expect(validate).toThrow(errorType);
    expect(validate).toThrow(errorMessage);
});

test("Invalid article type by default throws error of type Error", () => {
    const errorMessage = "Type is invalid";
    const validate = () => validateArticleType({}, {message: errorMessage});

    expect(validate).toThrow(Error);
});

test("Invalid article type by default throws error with error message 'Invalid type'", () => {
    const errorType = Error;
    const validate = () => validateArticleType({}, {errorType: Error});

    expect(validate).toThrow("Invalid type");
});