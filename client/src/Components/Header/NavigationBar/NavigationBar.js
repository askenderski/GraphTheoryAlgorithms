import navigationBarItems from "../../../Data/NavigationBarItems";
import {Menu} from "antd";

import UserContext from "../../../Contexts/User";
import {useContext} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Routes} from "../../../Data/Routes/routes";

function removeTrailingSlash(a) {
    return a.substring(a.length-1) === "/" ? a.substring(0,a.length-1) : a;
}

export default function () {
    const { user } = useContext(UserContext);
    const location = useLocation();

    const userNavigation = user === undefined
        ? (
            <>

                <Menu.Item style={{float: "right"}} key={Routes.authentication.registration.fullPath}>
                    <NavLink to={Routes.authentication.registration.fullPath}>
                        Register
                    </NavLink>
                </Menu.Item>
                <Menu.Item style={{float: "right"}} key={Routes.authentication.login.fullPath}>
                    <NavLink to={Routes.authentication.login.fullPath}>
                        Login
                    </NavLink>
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
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            {navigationBarItems.map(item=>(
                <Menu.Item key={removeTrailingSlash(item.redirectPath)}>
                    <NavLink to={item.redirectPath}>
                        {item.text}
                    </NavLink>
                </Menu.Item>
                )
            )}
            {userNavigation}
        </Menu>
    );
}