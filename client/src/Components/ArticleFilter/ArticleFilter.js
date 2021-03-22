import {Tag} from "antd";
import React from "react";
import style from "./ArticleFilter.module.css";
import useToggle from "../../Hooks/useToggle";
import {articleColorsMap, articleTypesSet} from "../../Data/articleTypes";

function validateProps({content, type}) {
    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    if (!articleTypesSet.has(type)) {
        throw new Error("Invalid type");
    }
}

export default function (props) {
    validateProps(props);

    const {content, type} = props;

    const [isOn, toggleIsOn] = useToggle();

    const classList = [style["article-filter"]];
    if (!isOn) {
        classList.push(style["inactive-article-filter"]);
    }

    return (
        <Tag.CheckableTag
            className={classList}
            style={{backgroundColor: articleColorsMap.get(type)}}
            onClick={toggleIsOn}
        >
            {content}
        </Tag.CheckableTag>
    );
};