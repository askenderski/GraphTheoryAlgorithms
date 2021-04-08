import navigationBarItems from "../../../Data/NavigationBarItems";
import {Menu} from "antd";

import UserContext from "../../../Contexts/User";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {Routes} from "../../../Data/Routes/routes";

export default function () {
    const { user } = useContext(UserContext);

    const userNavigation = user === undefined
        ? (
            <>

                <Menu.Item style={{float: "right"}}>
                    <Link to={Routes.authentication.registration.fullPath}>
                        Register
                    </Link>
                </Menu.Item>
                <Menu.Item style={{float: "right"}}>
                    <Link to={Routes.authentication.login.fullPath}>
                        Login
                    </Link>
                </Menu.Item>
            </>
        )
        : (
            <>
                <Menu.Item style={{float: "right"}}>
                    {user.username}
                </Menu.Item>
            </>
        );

    return (
        <Menu mode="horizontal">
            {navigationBarItems.map(item=>(
                <Menu.Item key={item.text}>
                    <Link to={item.redirectPath}>
                        {item.text}
                    </Link>
                </Menu.Item>
                )
            )}
            {userNavigation}
        </Menu>
    );
}