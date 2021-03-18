import {Tag} from "antd";

export default function (props) {
    const { content, color } = props;

    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    if (typeof color !== "string") {
        throw new Error("Invalid color");
    }

    return (
        <Tag.CheckableTag data-testId="with-backgroundColor" style={{backgroundColor: color}}>
            {content}
        </Tag.CheckableTag>
    );
};