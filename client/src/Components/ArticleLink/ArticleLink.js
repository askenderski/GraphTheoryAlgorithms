import {getWordsCutOffAtLength} from "../../Utilities/string";
import {isValidCssColor} from "../../Utilities/Validation/cssValidation";
import {articleColorsMap, articleTypesSet} from "../../Data/articleTypes";

function getDescriptionFormatted(description) {
    return getWordsCutOffAtLength(description, {minLength: 20, maxLength: 100});
}

function validateProps({type, description}) {
    if (typeof description !== "string") {

        throw new Error("Invalid description");
    }

    if (!articleTypesSet.has(type)) {
        throw new Error("Invalid type");
    }
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