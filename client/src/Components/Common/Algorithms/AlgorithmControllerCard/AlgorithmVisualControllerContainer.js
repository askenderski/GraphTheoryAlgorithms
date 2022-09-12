import { useEffect, useRef } from "react";
import useAlgorithmVisualHandlers from "../../../../Hooks/useAlgorithmVisualHandlers";

export default function AlgorithmVisualControllerContainer() {
    const {considerations, controller} = useAlgorithmVisualHandlers();

    const ref = useRef();

    useEffect(()=>{
        ref.current.scrollIntoView({behaviour: "smooth"});
    }, [considerations]);

    return <ul style={{overflow: "scroll"}}>
        {considerations.map(consideration=>
            <li onClick={()=>{
                console.log(consideration[consideration.length-1])
                console.log(controller.goTo)
                controller.goTo(consideration[consideration.length-1])
            }}
            >{consideration.join(" ")}</li>)}
        <li ref={ref}/>
    </ul>;
}