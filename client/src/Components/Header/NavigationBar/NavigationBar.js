import navigationBarItems from "../../../Data/NavigationBarItems";
import {Menu} from "antd";

import UserContext from "../../../Contexts/User";
import {useContext} from "react";

export default function () {
    const { user } = useContext(UserContext);

    const userNavigation = user === undefined
        ? (
            <>
                <Menu.Item style={{float: "right"}}>
                    Register
                </Menu.Item>
                <Menu.Item style={{float: "right"}}>
                    Login
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
            {navigationBarItems.map(item=><Menu.Item key={item.text}>{item.text}</Menu.Item>)}
            {userNavigation}
        </Menu>
    );
}