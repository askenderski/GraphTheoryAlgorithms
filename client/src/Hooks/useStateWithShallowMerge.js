import {useState} from "react";

export const useStateWithShallowMerge = defaultValue => {
    const [state, setState] = useState(defaultValue);

    return [state, val => setState(prevState => ({...prevState, ...val}))];
}