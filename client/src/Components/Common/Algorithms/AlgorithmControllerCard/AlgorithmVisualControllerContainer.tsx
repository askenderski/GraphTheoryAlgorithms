import { Controller } from "Algorithms/GenericController/IController";
import React, { useEffect, useRef } from "react";
import useAlgorithmVisualHandlers from "../../../../Hooks/useAlgorithmVisualHandlers";

export default function AlgorithmVisualControllerContainer() {
    const {considerations, controller}:
        {considerations: Array<any>, controller: Controller} = useAlgorithmVisualHandlers();

    const ref = useRef<HTMLLIElement>(null);

    useEffect(()=>{
        //ts forces my hand here
        if (!ref.current) return;

        ref.current.scrollIntoView({behavior: "smooth"});
    }, [considerations]);

    return <ul style={{overflow: "scroll"}}>
        {considerations.map(consideration=>
            <li onClick={()=>{
                controller.goTo(consideration[consideration.length-1])
            }}
            >{consideration.join(" ")}</li>)}
        <li ref={ref}/>
    </ul>;
}