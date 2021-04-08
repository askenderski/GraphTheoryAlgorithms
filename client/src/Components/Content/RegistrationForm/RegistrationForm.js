import ControlledTextInputWithValidation
    from "../../Common/ControlledTextInputWithValidation/ControlledTextInputWithValidation";
import {useEffect, useState} from "react";
import useValidateOnInputStop from "../../../Hooks/useValidateOnInputStop";
import {
    emailValidator,
    passwordComparator,
    passwordValidator,
    usernameValidator,
    validateToHaveNoErrors
} from "../../../Utilities/validators";

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
        passwordComparator,
        {defaultValue: {password, passwordRepeated}}
    );

    useEffect(() => {
        setPasswordAndPasswordRepeated({password, passwordRepeated});
    }, [password, passwordRepeated]);

    return (
        <form>
            {
                [
                    [email, setEmail, emailValidator, "Email"],
                    [username, setUsername, usernameValidator, "Username"],
                    [password, setPassword, passwordValidator, "Password"],
                    [
                        passwordRepeated, setPasswordRepeated,
                        validateToHaveNoErrors, "Repeat Password",
                        {errors: passwordRepeatedErrors}
                    ]
                ]
                    .map(inputTuple)
            }
        </form>
    );
};