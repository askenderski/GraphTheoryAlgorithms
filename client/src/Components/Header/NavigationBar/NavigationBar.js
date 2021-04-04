import navigationBarItems from "../../../Data/NavigationBarItems";
import {Menu} from "antd";

export default function () {
    return (
        <Menu mode="horizontal">
            {navigationBarItems.map(item=><Menu.Item key={item.text}>{item.text}</Menu.Item>)}
        </Menu>
    );
}