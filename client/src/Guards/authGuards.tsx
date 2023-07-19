import {useContext} from "react";
import UserContext from "../Contexts/User";
import InvalidRoute from "../Components/Common/InvalidRoute/InvalidRoute";

export interface IAuthGuard {
    (
        WrappedComponent: React.ElementType<any>,
        OnFailComponent?: React.ElementType<React.PropsWithChildren & {message: string}>
    ):
        React.ComponentType<any>
}

export const IsNotLoggedIn: IAuthGuard = function (WrappedComponent: React.ElementType<any>, OnFailComponent = InvalidRoute) {
    return function Component(props: React.PropsWithChildren) {
        const {user} = useContext(UserContext);

        if (user === undefined) {
            return <WrappedComponent {...props} />;
        } else {
            return <OnFailComponent message="You are already logged in!"/>;
        }
    }
};