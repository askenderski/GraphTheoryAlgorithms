export const addNameProperties = function (enumeration, nameProperty = "name") {
    Object.entries(enumeration).forEach(([enumName, enumVal])=>{
        enumVal[nameProperty] = enumName;
    });
}