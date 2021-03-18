import {Tag} from "antd";
import {isValidCssColor} from "../../Utilities/Validation/cssValidation";
import React from "react";
import style from "./ArticleFilter.module.css";
import useToggle from "../../Hooks/useToggle";

function validateProps({content, color}) {
    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    if (typeof color !== "string" || !isValidCssColor(color)) {
        throw new Error("Invalid color");
    }
}

export default function (props) {
    validateProps(props);

    const { content, color } = props;

    const [isOn, toggleIsOn] = useToggle();

    const classList = [style["article-filter"]];
    if (!isOn) {
        classList.push(style["inactive-article-filter"]);
    }

    return (
        <Tag.CheckableTag
            className={classList}
            data-testid="with-background-color"
            style={{backgroundColor: color}}
            onClick={toggleIsOn}
        >
            {content}
        </Tag.CheckableTag>
    );
};