import ControlledTextInput from "../../../Components/Common/ControlledTextInput/ControlledTextInput";
import {fireEvent, render} from "@testing-library/react";
import {useState} from "react";

test("ControlledTextInput shows correct state", () => {
    const value = "1";

    const wrapper = render(<ControlledTextInput value={value}/>);

    expect(wrapper.getByTestId("controlled-text-input").value).toBe(value);
});

test("ControlledTextInput calls setValue when input is changed", () => {
    const oldValue = "1";
    const newValue = "2";

    function Form({defaultValue}) {
        const [value, setValue] = useState(defaultValue);

        return <ControlledTextInput value={value} setValue={setValue} />;
    }

    const wrapper = render(<Form defaultValue={oldValue} />);

    fireEvent.change(wrapper.getByTestId("controlled-text-input"), { target: { value: newValue } });

    expect(wrapper.getByTestId("controlled-text-input").value).toBe(newValue);
});

test("ControlledTextInput shows correct errors", () => {
    const errors = [
        "Error 1",
        "Error 2"
    ];

    const wrapper = render(<ControlledTextInput errors={errors} />);

    for (const error of errors) {
        expect(wrapper.getByText(error)).toBeInTheDocument();
    }
});