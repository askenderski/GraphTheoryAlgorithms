import { addNameProperties } from "../../Utilities/enum";

test("Add Name Properties adds all properties correctly", () => {
    const nameProperty = "nameProp";
    const enumeration = {
        A: {},
        B: {}
    };

    addNameProperties(enumeration, nameProperty);

    Object.entries(enumeration).forEach(([enumName, enumVal]) => {
        expect(enumVal[nameProperty]).toBe(enumName);
    });
});

test("Add Name Properties adds all properties at property 'name' by default", () => {
    const enumeration = {
        A: {},
        B: {}
    };

    addNameProperties(enumeration);

    Object.entries(enumeration).forEach(([enumName, enumVal]) => {
        expect(enumVal.name).toBe(enumName);
    });
});