import {Tag} from "antd";
import React from "react";
import style from "./ArticleFilter.module.css";
import useToggle from "../../../../../Hooks/useToggle";
import {articleColorsMap, articleTypesSet} from "../../../../../Data/articleTypes";
import {validateArticleType} from "../../../../../Utilities/Validation/articleTypeValidation";

function validateProps({content, type}) {
    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    validateArticleType(type);
}

export default function (props) {
    validateProps(props);

    function handleOnClick() {
        if (isOn) {
            removeFilter();
        } else {
            addFilter();
        }

        toggleIsOn();
    }

    const {content, type, addFilter, removeFilter} = props;

    const [isOn, toggleIsOn] = useToggle();

    const classList = [style["article-filter"]];
    if (!isOn) {
        classList.push(style["inactive-article-filter"]);
    }

    return (
        <Tag.CheckableTag
            className={classList}
            style={{backgroundColor: articleColorsMap.get(type)}}
            onClick={handleOnClick}
        >
            {content}
        </Tag.CheckableTag>
    );
};