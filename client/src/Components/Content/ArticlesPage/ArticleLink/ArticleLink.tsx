import {getWordsCutOffAtLength} from "../../../../Utilities/String/getWordsCutOffAtLength";
import {IArticleType, articleColorsMap} from "../../../../Data/ArticleTypes";
import {validateArticleType} from "../../../../Utilities/Validation/articleTypeValidation";
import {Link} from "react-router-dom";

function getDescriptionFormatted(description: string) {
    return getWordsCutOffAtLength(description, {minLength: 20, maxLength: 100});
}

function validateProps({type, description}: IArticleLinkProps) {
    if (typeof description !== "string") {
        throw new Error("Invalid description");
    }

    validateArticleType(type);
}

interface IArticleLinkProps extends React.PropsWithChildren {
    type: IArticleType,
    description: string,
    title: string,
    to: string
}

export default function ArticleLink(props: IArticleLinkProps) {
    validateProps(props);

    const {title, description, type, to} = props;

    return (
        <Link to={to} style={{textDecoration: 'none', color: "inherit"}}>
            <p data-testid="article-link" style={{backgroundColor: articleColorsMap.get(type)}}>{title}</p>
            <p data-testid="article-description">
                {getDescriptionFormatted(description)}
            </p>
        </Link>
    );
};