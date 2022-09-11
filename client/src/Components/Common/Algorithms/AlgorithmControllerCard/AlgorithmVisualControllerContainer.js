import { useEffect, useRef } from "react";
import useAlgorithmVisualHandlers from "../../../../Hooks/useAlgorithmVisualHandlers";

export default function AlgorithmVisualControllerContainer() {
    const {considerations} = useAlgorithmVisualHandlers();

    const ref = useRef();

    useEffect(()=>{
        ref.current.scrollIntoView({behaviour: "smooth"});
    }, [considerations]);

    return <ul style={{overflow: "scroll"}}>
        {considerations.map(consideration=><li>{consideration.join(" ")}</li>)}
        <li ref={ref}/>
    </ul>;
}