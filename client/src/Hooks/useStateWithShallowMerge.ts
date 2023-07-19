import {useState} from "react";

function useStateWithShallowMerge<T> (defaultValue: T) {
    const [state, setState] = useState<T>(defaultValue);

    return [state, (val: T) => setState((prevState: T) => ({...prevState, ...val}))] as [T, (arg: T)=>void];
}

export default useStateWithShallowMerge;