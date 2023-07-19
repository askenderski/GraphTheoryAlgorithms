import {Tag} from "antd";
import React from "react";
import style from "./ArticleFilter.module.css";
import useToggle from "../../../../../Hooks/useToggle";
import {IArticleType, articleColorsMap} from "../../../../../Data/ArticleTypes";
import {validateArticleType} from "../../../../../Utilities/Validation/articleTypeValidation";

function validateProps({content, type}: IArticleFilterProps) {
    if (typeof content !== "string" || content === "") {
        throw new Error("Invalid text content");
    }

    validateArticleType(type);
}

interface IArticleFilterProps extends React.PropsWithChildren {
    content: string,
    type: IArticleType,
    addFilter:()=>void,
    removeFilter:()=>void
}

interface ICheckProps extends React.PropsWithChildren {
    className: string,
    style: {[key:string]:any},
    onClick: Function
}

const Check = Tag.CheckableTag as React.FC<ICheckProps>;

export default function ArticleFilter(props: IArticleFilterProps) {
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
        <Check
            className={classList.join(" ")}
            style={{backgroundColor: articleColorsMap.get(type)}}
            onClick={handleOnClick}
        >
            {content}
        </Check>
    );
};