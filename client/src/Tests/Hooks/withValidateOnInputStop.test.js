import * as React from "react";
import withValidateOnInputStop from "../../Hooks/withValidateOnInputStop";
// import {renderHook, cleanup, act} from "@testing-library/react-hooks";
import {render, cleanup, act} from "@testing-library/react";
import {mount} from "enzyme";

jest.mock('react', () => {
    const originalReact = jest.requireActual('react');

    return {
        ...originalReact,
        useStateOriginal: originalReact.useState,
        useState: jest.fn()
    };
});

beforeEach(()=> {
    jest.useFakeTimers();
    React.useState.mockImplementation((...props) => {
        return React.useStateOriginal(...props);
    });
});

afterEach(cleanup);

const validateStringIsNotEmpty = value => {
    const errors = [];

    if (value <= 0) errors.push("Value should be of length at least 1");

    return errors;
};
const validateNumberIsPositive = value => {
    const errors = [];

    if (value <= 0) errors.push("Value should be positive");

    return errors;
};

const Component = props => null;
const ComponentWithValidateOnInputStop = withValidateOnInputStop(Component);

function Form({validate = () => [], defaultValue, ...restProps}) {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <ComponentWithValidateOnInputStop
            validate={validate}
            value={value}
            setValue={setValue}
            {...restProps}
        />
    );
}

test("withValidateOnInputStop passes properties other than expected correctly", () => {
    const unexpectedValue = 1;

    const wrapper = mount(<Form unexpectedValue={unexpectedValue} />);

    expect(wrapper.find(Component).prop("unexpectedValue")).toBe(unexpectedValue);
});

test("withValidateOnInputStop passes correct default value", () => {
    const defaultValue = 1;

    const wrapper = mount(<Form defaultValue={defaultValue} />);

    expect(wrapper.find(Component).prop("value")).toBe(defaultValue);
});

test("withValidateOnInputStop changes value when setValue is invoked", () => {
    const defaultValue = 1;
    const newValue = 2;

    const wrapper = mount(<Form defaultValue={defaultValue} />);

    act(()=>wrapper.find(Component).prop("setValue")(newValue));
    act(()=>{wrapper.update();});

    expect(wrapper.find(Component).prop("value")).toBe(newValue);
});

test("withValidateOnInputStop changes value multiple times when setValue is invoked multiple times", () => {
    const value1 = 1;
    const value2 = 2;
    const value3 = 3;

    const wrapper = mount(<Form defaultValue={value1} />);

    act(()=>wrapper.find(Component).prop("setValue")(value2));
    act(()=>{wrapper.update();});
    act(()=>wrapper.find(Component).prop("setValue")(value3));
    act(()=>{wrapper.update();});

    expect(wrapper.find(Component).prop("value")).toBe(value3);
});

test("withValidateOnInputStop validates default value immediately", () => {
    const defaultValue = 0;

    const wrapper = mount(<Form defaultValue={defaultValue} validate={validateNumberIsPositive} />);

    expect(wrapper.find(Component).prop("errors")).toEqual(["Value should be positive"]);
});

test("withValidateOnInputStop doesn't immediately set errors when invalid value is given", () => {
    const defaultValue = 1;
    const invalidValue = 0;

    const wrapper = mount(<Form defaultValue={defaultValue} validate={validateNumberIsPositive} />);

    act(()=>wrapper.find(Component).prop("setValue")(invalidValue));
    act(()=>{wrapper.update();});

    expect(wrapper.find(Component).prop("errors")).toEqual([]);
});

test("withValidateOnInputStop returns errors when invalid value is given and no input is given for 1 second", async () => {
    const defaultValue = 1;
    const invalidValue = 0;

    const wrapper = mount(<Form defaultValue={defaultValue} validate={validateNumberIsPositive} />);

    act(()=>{wrapper.find(Component).prop("setValue")(invalidValue);});
    act(()=>{wrapper.update();});
    act(()=>{jest.runAllTimers();});
    act(()=>{wrapper.update();});

    expect(wrapper.find(Component).prop("errors")).toEqual(["Value should be positive"]);
});

test("withValidateOnInputStop does not return errors when 1 second has passed since first input but there has been an input during that period", async () => {
    const defaultValue = 1;

    const invalidValue1 = 0;
    const invalidValue2 = -1;

    const wrapper = mount(<Form defaultValue={defaultValue} validate={validateNumberIsPositive} />);

    updatValueAndWait(wrapper, invalidValue1, 600);
    updatValueAndWait(wrapper, invalidValue2, 600);

    expect(wrapper.find(Component).prop("errors")).toEqual([]);
});

test("withValidateOnInputStop returns different errors when new value is given and no input is given for 1 second after", async () => {
    const value1 = 1;
    const value2 = 0;
    const value3 = 1;

    const wrapper = mount(<Form defaultValue={value1} validate={validateNumberIsPositive} />);

    updatValueAndWait(wrapper, value2, 1200);
    updatValueAndWait(wrapper, value3, 1200);

    expect(wrapper.find(Component).prop("errors")).toEqual([]);
});

function mockUseStateToReturnSetters() {
    const setValues = [];

    React.useState.mockImplementation((...props) => {
        const useStateResult = React.useStateOriginal(...props);

        const setState = useStateResult[1];
        useStateResult[1] = (...args) => {
            setValues.push(args[0]);

            return setState(...args);
        };

        return useStateResult;
    });

    return setValues;
}

function updatValueAndWait(wrapper, value2, time) {
    act(() => {wrapper.find(Component).prop("setValue")(value2);});
    act(() => {
        wrapper.update();
    });
    act(() => {jest.advanceTimersByTime(time);});
    act(() => {
        wrapper.update();
    });
}

test("withValidateOnInputStop clears timeout on unmount", async () => {
    const value1 = "a";
    const value2 = "";

    const setValuesInUseState = mockUseStateToReturnSetters();
    const wrapper = mount(<Form defaultValue={value1} validate={validateStringIsNotEmpty} />);

    updatValueAndWait(wrapper, value2, 600);

    wrapper.unmount();

    const timeouts = setValuesInUseState.filter(setValue=>typeof setValue === "number");

    const timeoutClears = clearTimeout.mock.calls.map(([timeout])=>timeout).filter(timeout=>timeout !== undefined);
    for (const timeoutClear of timeoutClears) {
        expect(timeouts.find(timeout=>timeoutClear === timeout)).not.toBeUndefined();
    }
});