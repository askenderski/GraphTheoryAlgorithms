import {mount} from "enzyme";
import App from "../App";
import Header from "../Components/Header/Header";
import Content from "../Components/Content/Content";

test("App contains Header", async () => {
    const wrapper = mount(<App/>);

    expect(wrapper.find(Header)).toHaveLength(1);
});

test("App contains Content", async () => {
    const wrapper = mount(<App/>);

    expect(wrapper.find(Content)).toHaveLength(1);
});