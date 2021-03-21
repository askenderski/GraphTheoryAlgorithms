import {getWordsCutOffAtLength} from "../../Utilities/string";
import {isValidCssColor} from "../../Utilities/Validation/cssValidation";

function getDescriptionFormatted(description) {
    return getWordsCutOffAtLength(description, {minLength: 20, maxLength: 100});
}

function validateProps({color, description}) {
    if (typeof color !== "string" || !isValidCssColor(color)) {
        throw new Error("Invalid color");
    }

    if (typeof description !== "string") {
        throw new Error("Invalid description");
    }
}

export default function (props) {
    validateProps(props);

    const {name, description, color} = props;

    return (
        <div data-testid="article-link" style={{backgroundColor: color}}>
            <span>{name}</span>
            <p data-testid="article-description">{getDescriptionFormatted(description)}</p>
        </div>
    );
};