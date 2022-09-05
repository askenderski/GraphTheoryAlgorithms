import useSizeObserver from "./useSizeObserver";
import {useState} from "react";

export default function useResizer(defaultSize={}) {
    const [size, setSize] = useState(defaultSize);

    //size is updated to that of the ref element
    const updateSize = () => {
        setSize({
            width: sizeRef.current?.offsetWidth + "px",
            height: sizeRef.current?.offsetHeight + "px"
        })
    };

    //we observe the size and update it whenever it changes
    const sizeRef = useSizeObserver({style: size}, updateSize);

    return {size, ref: sizeRef};
};