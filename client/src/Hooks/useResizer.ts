import useSizeObserver from "./useSizeObserver";
import {useState} from "react";

export interface ISize {
    width: string,
    height: string
}

export default function useResizer(defaultSize={width: "0px", height: "0px"}) {
    const [size, setSize] = useState<ISize>(defaultSize);

    //size is updated to that of the ref element
    const updateSize = () => {
        const currentRef = sizeRef.current;
        const offsetWidth = currentRef !== null && "offsetWidth" in currentRef ? currentRef.offsetWidth.toString()+"px" : "0px";
        const offsetHeight = currentRef !== null && "offsetHeight" in currentRef ? currentRef.offsetWidth.toString()+"px" : "0px";

        setSize({
            width: offsetWidth,
            height: offsetHeight
        })
    };

    //we observe the size and update it whenever it changes
    const sizeRef = useSizeObserver(updateSize);

    return {size, ref: sizeRef};
};