import {useContext, useState} from "react";
import {emailValidator, passwordValidator} from "../../../Utilities/validators";
import {login} from "../../../Services/authenticationService";
import {Routes} from "../../../Data/Routes/routes";
import Form from "../../Common/Form/Form";
import UserContext from "../../../Contexts/User";

export default function LoginForm() {
    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form
            service={{
                service: login,
                serviceArguments: {email,  password},
                redirectPath: Routes.home.fullPath,
                dealWithResponse: res => {
                    setUser(res.user);
                }
            }}

            input={
                {
                    inputTuples: [
                        [email, setEmail, emailValidator, "Email"],
                        [password, setPassword, passwordValidator, "Password", {type: "password"}]
                    ],
                    submitValue: "Login"
                }
            }
        >
        </Form>
    );
};