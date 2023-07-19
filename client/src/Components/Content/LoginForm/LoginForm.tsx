import {useContext} from "react";
import {emailValidator, passwordValidator} from "../../../Utilities/validators";
import {login} from "../../../Services/authenticationService";
import {Routes} from "../../../Data/Routes/routes";
import Form from "../../Common/Form/Form";
import UserContext, { IUser } from "../../../Contexts/User";
import ControlledTextInputWithValidation from "Components/Common/Form/ControlledTextInputWithValidation";
import Submit from "Components/Common/Form/Submit";

export default function LoginForm() {
    const {setUser} = useContext(UserContext);

    return (
        <Form
            service={{
                service: login,
                getArguments: (values: {[key: string]: any})=>({email: values.email, password: values.password}),
                redirectPath: Routes.home.fullPath,
                dealWithResponse: (res: {user: IUser}) => {
                    setUser(res.user);
                }
            }}
        >
            <ControlledTextInputWithValidation
                validate={emailValidator}
                displayName="Email"
                valueName="email"
            />
            <ControlledTextInputWithValidation
                validate={passwordValidator}
                displayName="Password"
                valueName="password"
                type="password"
            />
            <Submit value="login"/>
        </Form>
    );
};