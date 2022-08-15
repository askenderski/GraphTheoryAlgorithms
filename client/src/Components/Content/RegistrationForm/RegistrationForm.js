import {useEffect, useState} from "react";
import useValidateOnInputStop from "../../../Hooks/useValidateOnInputStop";
import {
    emailValidator,
    passwordComparator,
    passwordValidator,
    usernameValidator,
    validateToHaveNoErrors
} from "../../../Utilities/validators";
import {register} from "../../../Services/authenticationService";
import {Routes} from "../../../Data/Routes/routes";
import Form from "../../Common/Form/Form";

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
        <Form
            service={{
                service: register,
                serviceArguments: {email, username, password},
                redirectPath: Routes.authentication.login.fullPath,
                errors: passwordRepeatedErrors
            }}

            input={
                {
                    inputTuples: [
                        [email, setEmail, emailValidator, "Email"],
                        [username, setUsername, usernameValidator, "Username"],
                        [password, setPassword, passwordValidator, "Password", {type: "password"}],
                        [
                            passwordRepeated, setPasswordRepeated,
                            validateToHaveNoErrors, "Repeat Password",
                            {errors: passwordRepeatedErrors, type: "password"}
                        ]
                    ],
                    submitValue: "Register"
                }
            }
        >
        </Form>
    );
};