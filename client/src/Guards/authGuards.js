import {useContext} from "react";
import UserContext from "../Contexts/User";
import InvalidRoute from "../Components/Common/InvalidRoute/InvalidRoute";

export const IsNotLoggedIn = function (WrappedComponent, OnFailComponent = InvalidRoute) {
    return function Component(props) {
        const {user} = useContext(UserContext);

        if (user === undefined) {
            return <WrappedComponent {...props} />;
        } else {
            return <OnFailComponent message="You are already logged in!"/>;
        }
    }
};