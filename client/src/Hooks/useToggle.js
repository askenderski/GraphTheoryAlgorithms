import React from "react";

export default function (initialState = true) {
    const [isOn, toggleIsOn] = React.useState(initialState);

    return [isOn, () => toggleIsOn(!isOn)];
}