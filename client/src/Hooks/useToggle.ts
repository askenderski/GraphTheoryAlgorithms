import React from "react";

export default function useToggle(initialState = true): [boolean, ()=>void] {
    const [isOn, toggleIsOn] = React.useState<boolean>(initialState);

    return [isOn, () => toggleIsOn(!isOn)];
}