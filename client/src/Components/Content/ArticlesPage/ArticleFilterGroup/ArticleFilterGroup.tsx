import HorizontalList from "../../../Common/HorizontalList/HorizontalList";
import ArticleFilter from "./ArticleFilter/ArticleFilter";
import {articleTypesIterable} from "../../../../Data/ArticleTypes";

interface IArticleFilterGroupProps extends React.PropsWithChildren {
    addFilter(arg: string): void,
    removeFilter(arg: string): void
}

export default function ArticleFilterGroup({addFilter, removeFilter}: IArticleFilterGroupProps) {
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