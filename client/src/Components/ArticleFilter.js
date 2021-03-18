import {Tag} from "antd";
import {isValidCssColor} from "../Utilities/Validation/cssValidation";

export default function (props) {
    const { content, color } = props;

    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    if (typeof color !== "string" || !isValidCssColor(color)) {
        throw new Error("Invalid color");
    }

    return (
        <Tag.CheckableTag data-testId="with-backgroundColor" style={{backgroundColor: color}}>
            {content}
        </Tag.CheckableTag>
    );
};