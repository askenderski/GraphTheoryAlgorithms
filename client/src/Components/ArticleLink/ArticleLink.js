import {getWordsCutOffAtLength} from "../../Utilities/String/getWordsCutOffAtLength";
import {articleColorsMap, articleTypesSet} from "../../Data/articleTypes";
import {validateArticleType} from "../../Utilities/Validation/articleTypeValidation";

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

    const {name, description, type} = props;

    return (
        <div data-testid="article-link" style={{backgroundColor: articleColorsMap.get(type)}}>
            <span>{name}</span>
            <p data-testid="article-description">{getDescriptionFormatted(description)}</p>
        </div>
    );
};