import { useEffect, useState } from "react";

export default function Between({currentlyMovingElement}) {
    const [lightUp, setLightUp] = useState(false);

    const backgroundColor = lightUp ? "blue" : "";

    useEffect(()=>{
        if (!currentlyMovingElement) setLightUp(false);
    }, [currentlyMovingElement]);

    return <div
            onMouseOver={()=>currentlyMovingElement ? setLightUp(true) : ()=>{}}
            onMouseOverCapture={()=>currentlyMovingElement ? setLightUp(true) : ()=>{}}
            onMouseLeave={()=>setLightUp(false)}
            style={{height: "100px", width: "100%", backgroundColor}}></div>;
}