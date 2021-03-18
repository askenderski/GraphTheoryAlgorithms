import {Tag} from "antd";
import {isValidCssColor} from "../Utilities/Validation/cssValidation";
import React from "react";
import style from "./ArticleFilter.module.css";
import useToggle from "../Hooks/useToggle";

export default function (props) {
    const { content, color } = props;

    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    if (typeof color !== "string" || !isValidCssColor(color)) {
        throw new Error("Invalid color");
    }

    const [isOn, toggleIsOn] = useToggle();
    const classList = [style["article-filter"]];
    if (!isOn) {
        classList.push(style["inactive-article-filter"]);
    }

    return (
        <Tag.CheckableTag
            className={classList}
            data-testid="with-backgroundColor"
            style={{backgroundColor: color}}
            onClick={()=>toggleIsOn()}
        >
            {content}
        </Tag.CheckableTag>
    );
};