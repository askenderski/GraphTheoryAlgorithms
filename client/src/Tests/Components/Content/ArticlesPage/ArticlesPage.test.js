import ArticleFilterGroup from "../../../../Components/Content/ArticlesPage/ArticleFilterGroup/ArticleFilterGroup";
import {mount} from "enzyme";
import ArticlesPage from "../../../../Components/Content/ArticlesPage/ArticlesPage";
import Articles from "../../../../Components/Content/ArticlesPage/Articles/Articles";

test("ArticlesPage contains ArticleFilterGroup component", () => {
    const wrapper = mount(<ArticlesPage/>);

    expect(wrapper.find(ArticleFilterGroup)).toHaveLength(1);
})

test("ArticlesPage contains Articles component", () => {
    const wrapper = mount(<ArticlesPage/>);

    expect(wrapper.find(Articles)).toHaveLength(1);
})