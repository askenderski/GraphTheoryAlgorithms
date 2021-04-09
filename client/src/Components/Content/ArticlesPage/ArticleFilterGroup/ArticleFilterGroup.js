import HorizontalList from "../../../Common/HorizontalList/HorizontalList";
import ArticleFilter from "./ArticleFilter/ArticleFilter";
import {articleTypesIterable} from "../../../../Data/articleTypes";

export default function ({addFilter, removeFilter}) {
    return (
        <HorizontalList>
            {
                articleTypesIterable.map(articleType=>
                    (
                        <ArticleFilter
                            content={articleType.name}
                            type={articleType}
                            key={articleType.name}
                            addFilter={addFilter.bind(addFilter, articleType.name)}
                            removeFilter={removeFilter.bind(removeFilter, articleType.name)}
                        />
                        )
                )
            }
        </HorizontalList>
    );
};