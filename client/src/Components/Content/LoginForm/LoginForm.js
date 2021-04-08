import ControlledTextInputWithValidation
    from "../../Common/ControlledTextInputWithValidation/ControlledTextInputWithValidation";
import {useState} from "react";
import {emailValidator, passwordValidator} from "../../../Utilities/validators";

function inputTuple([value, setValue, validator, displayName, rest]) {
    return <ControlledTextInputWithValidation
        key={displayName}
        displayName={displayName}
        value={value}
        setValue={setValue}
        validate={validator}
        {...rest}
    />;
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            {
                [
                    [email, setEmail, emailValidator, "Email"],
                    [password, setPassword, passwordValidator, "Password"],
                ]
                    .map(inputTuple)
            }
        </form>
    );
};