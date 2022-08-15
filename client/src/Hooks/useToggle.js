import React from "react";

export default function useToggle(initialState = true) {
    const [isOn, toggleIsOn] = React.useState(initialState);

    return [isOn, () => toggleIsOn(!isOn)];
}