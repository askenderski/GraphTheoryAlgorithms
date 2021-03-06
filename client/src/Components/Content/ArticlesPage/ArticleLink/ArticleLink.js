import {getWordsCutOffAtLength} from "../../../../Utilities/String/getWordsCutOffAtLength";
import {articleColorsMap, articleTypesSet} from "../../../../Data/articleTypes";
import {validateArticleType} from "../../../../Utilities/Validation/articleTypeValidation";
import {Link} from "react-router-dom";

function getDescriptionFormatted(description) {
    return getWordsCutOffAtLength(description, {minLength: 20, maxLength: 100});
}

function validateProps({type, description}) {
    if (typeof description !== "string") {
        throw new Error("Invalid description");
    }

    validateArticleType(type);
}

export default function (props) {
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