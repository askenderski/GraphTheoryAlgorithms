import React from "react";
import style from "./HorizontalList.module.css";

export default function (props) {
    const classList = [style["horizontal-list"]];
    const {children} = props;

    return (
        <ul className={classList}>{children}</ul>
    );
};