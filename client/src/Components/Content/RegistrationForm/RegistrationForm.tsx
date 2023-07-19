import {useContext} from "react";
import {
    emailValidator,
    passwordComparator,
    passwordValidator,
    usernameValidator,
    validateToHaveNoErrors,
} from "../../../Utilities/validators";
import {register} from "../../../Services/authenticationService";
import {Routes} from "../../../Data/Routes/routes";
import Form from "../../Common/Form/Form";
import UserContext, { IUser } from "Contexts/User";
import Submit from "Components/Common/Form/Submit";
import ControlledTextInput from "Components/Common/ControlledTextInput/ControlledTextInput";
import ControlledTextInputWithValidation from "Components/Common/Form/ControlledTextInputWithValidation";

export default function RegistrationForm() {
    const {setUser} = useContext(UserContext);

    return (
        <Form
            service={{
                service: register,
                getArguments: (values: {[key: string]: any})=>({
                    email: values.email, username: values.username, password: values.password
                }),
                redirectPath: Routes.authentication.login.fullPath,
                dealWithResponse: (res: {user: IUser})=>{
                    setUser(res.user);
                }
            }}
            getStateErrors={({password, passwordRepeated})=>passwordComparator({password, passwordRepeated})}
        >
            <ControlledTextInputWithValidation
                validate={emailValidator}
                displayName="Email"
                valueName="email"
            />
            <ControlledTextInputWithValidation
                validate={usernameValidator}
                displayName="Username"
                valueName="username"
            />
            <ControlledTextInputWithValidation
                validate={passwordValidator}
                displayName="Password"
                valueName="password"
            />
            <ControlledTextInputWithValidation
                validate={validateToHaveNoErrors}
                displayName="Repeat Password"
                valueName="passwordRepeated"
            />
            <Submit value="register"/>
        </Form>
    );
};