import React from "react";
import HorizontalList from "../HorizontalList/HorizontalList";
import ArticleFilter from "../ArticleFilter/ArticleFilter";
import {articleTypesIterable} from "../../Data/articleTypes";

export default function (props) {
    return (
        <HorizontalList>
            {
                articleTypesIterable.map(articleType=>
                    (<ArticleFilter
                        content={articleType.name}
                        type={articleType}
                        key={articleType.name}
                    />)
                )
            }
        </HorizontalList>
    );
};