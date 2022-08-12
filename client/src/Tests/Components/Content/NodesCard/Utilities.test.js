import {getCardStyle, getHeaderStyle} from "../../../../Components/Content/AlgorithmPage/NodesCard/Utilities/getStyles"
import _ from "lodash";

describe("getCardStyle", ()=>{
    test("getCardStyle returns correct properties", () => {
        const expected = {
            size: {width: "10px", height: "20px"},
            position: {x: 10, y: 20}
        };
        const arg = {size: {...expected.size, a: 2}, position: {...expected.position, b: 3}};

        const result = getCardStyle(arg);

        expect(_.isEqual(result,
            {...expected.size, left: expected.position.x, top: expected.position.y})
        )
            .toBe(true);
    });
});

describe("getCardStyle", ()=>{
    test("getCardStyle returns correct properties", () => {
        const expected = {
            size: {width: "10px", height: "20px"},
            position: {x: 10, y: 20}
        };
        const arg = {size: {...expected.size, a: 2}, position: {...expected.position, b: 3}};

        const result = getCardStyle(arg);

        expect(_.isEqual(result,
            {...expected.size, left: expected.position.x, top: expected.position.y})
        )
            .toBe(true);
    });
});

describe("getHeaderStyle", ()=>{
    test("getHeaderStyle returns correct properties", () => {
        const expected = {
            size: {width: "10px", height: 40},
            position: {x: 10, y: 20}
        };
        const arg = {
            size: {width: expected.size.width, height: expected.size.height*5+"px", a: 2},
            position: {...expected.position, b: 3}
        };

        const result = getHeaderStyle(arg);

        expect(_.isEqual(result,
            {...expected.size, left: expected.position.x, top: expected.position.y})
        )
            .toBe(true);
    });

    test("getHeaderStyle returns correct height when it would be under minimum by calculating from card size", () => {
        const arg = {
            size: {width: "10px", height: 30-1+"px"},
            position: {x: 10, y: 20}
        };

        const result = getHeaderStyle(arg);

        expect(result.height).toBe(30);
    });

    test("getHeaderStyle returns correct height when it would be exactly 30 by calculating from card size", () => {
        const arg = {
            size: {width: "10px", height: 30*5+"px"},
            position: {x: 10, y: 20}
        };

        const result = getHeaderStyle(arg);

        expect(result.height).toBe(30);
    });

    test("getHeaderStyle returns correct height when it would be more than 30 by calculating from card size", () => {
        const expectedHeight = 35;
        const arg = {
            size: {width: "10px", height: 35*5+"px"},
            position: {x: 10, y: 20}
        };

        const result = getHeaderStyle(arg);

        expect(result.height).toBe(expectedHeight);
    });
});