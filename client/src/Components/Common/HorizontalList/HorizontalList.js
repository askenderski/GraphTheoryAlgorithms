import React from "react";
import style from "./HorizontalList.module.css";

export default function HorizontalList({children}) {
    const classList = [style.horizontalList];

    return (
        <ul className={classList}>{children}</ul>
    );
};