export const addNameProperties = function (enumeration: {[key in string]: {[key in string]: any}}, nameProperty = "name") {
    Object.entries(enumeration).forEach(([enumName, enumVal])=>{
        enumVal[nameProperty] = enumName;
    });
}