import ArticleFilterGroup from "../../../Components/Content/ArticleFilterGroup/ArticleFilterGroup";
import {mount} from "enzyme";
import ArticlePage from "../../../Components/Content/ArticlePage/ArticlePage";
import Articles from "../../../Components/Content/Articles/Articles";

test("ArticlePage contains ArticleFilterGroup component", () => {
    const wrapper = mount(<ArticlePage/>);

    expect(wrapper.find(ArticleFilterGroup)).toHaveLength(1);
})

test("ArticlePage contains Articles component", () => {
    const wrapper = mount(<ArticlePage/>);

    expect(wrapper.find(Articles)).toHaveLength(1);
})