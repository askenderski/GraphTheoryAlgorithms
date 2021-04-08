import ControlledTextInputWithValidation
    from "../../Common/ControlledTextInputWithValidation/ControlledTextInputWithValidation";
import {useEffect, useState} from "react";
import isEmail from "validator/es/lib/isEmail";
import useValidateOnInputStop from "../../../Hooks/useValidateOnInputStop";

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

export default function RegistrationForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeated, setPasswordRepeated] = useState("");
    const {errors: passwordRepeatedErrors, setValue: setPasswordAndPasswordRepeated} = useValidateOnInputStop(
        ({password, passwordRepeated}) => {
            const errors = [];

            if (passwordRepeated !== password) errors.push("Passwords must match");

            return errors;
        },
        {defaultValue: {password, passwordRepeated}}
    );

    useEffect(() => {
        setPasswordAndPasswordRepeated({password, passwordRepeated});
    }, [password, passwordRepeated]);

    const emailValidator = email => {
        const errors = [];

        if (!isEmail(email)) errors.push("Invalid email");

        return errors;
    };
    const usernameValidator = username => {
        const errors = [];

        if (username.length === 0) errors.push("Username cannot be empty");

        return errors;
    };
    const passwordValidator = password => {
        const errors = [];

        if (password.length < 8) errors.push("Password must be at least 8 characters long");
        if (password.match(/[^0-9a-zA-Z]+/) !== null) errors.push("Password can only contain letters and numbers");

        return errors;
    };

    return (
        <form>
            {
                [
                    [email, setEmail, emailValidator, "Email"],
                    [username, setUsername, usernameValidator, "Username"],
                    [password, setPassword, passwordValidator, "Password"],
                    [passwordRepeated, setPasswordRepeated, ()=>[], "Repeat Password", {errors: passwordRepeatedErrors}]
                ]
                    .map(inputTuple)
            }
        </form>
    );
};