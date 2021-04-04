import {articleColorsMap, articleTextMap} from "../../../../Data/articleTypes";

export default function ArticleLinkGroup(props) {
    return (
        <div>
            <span data-testid="article-link-group" style={{backgroundColor: articleColorsMap.get(props.type)}}>
                {articleTextMap.get(props.type)}
            </span>
            {props.children}
        </div>
    );
};