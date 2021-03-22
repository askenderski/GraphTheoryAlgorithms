import React from "react";
import {articleColorsMap, articleTextMap, ArticleTypes, articleTypesSet} from "../../Data/articleTypes";

function validateProps({title, description, type}) {
    if (typeof title !== "string" || title === "") {
        throw new Error("Invalid title");
    }

    if (typeof description !== "string" || description === "") {
        throw new Error("Invalid description");
    }

    if (!articleTypesSet.has(type)) {
        throw new Error("Invalid type");
    }
}

export default function (props) {
    validateProps(props);

    return (
        <div>
            <h1 style={{backgroundColor: articleColorsMap.get(props.type)}}>{articleTextMap.get(props.type)}</h1>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    );
};