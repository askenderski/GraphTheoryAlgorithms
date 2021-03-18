import { isValidCssColor } from "../../../Utilities/Validation/cssValidation";

test("isValidCssColor returns true for valid colors", () => {
    expect(isValidCssColor("blue")).toBe(true);
});

test("isValidCssColor returns false for invalid colors", () => {
    expect(isValidCssColor("aaa")).toBe(false);
});