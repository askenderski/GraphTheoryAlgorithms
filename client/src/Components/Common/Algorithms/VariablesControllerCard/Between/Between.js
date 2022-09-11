import styleModule from "./Between.module.css";
import { useEffect, useState, useRef } from "react";

export default function Between({ground, style, setDealWith}) {
    const [lightUp, setLightUp] = useState(false);
    const ref = useRef();

    const backgroundColor = lightUp ? "blue" : "";

    useEffect(()=>{
        const dealWith = e => {
            if (e.type === "mousemove" || e.type === "mousedown") {
                if (isInBounds(e)) {
                    setLightUp(true);
                } else {
                    setLightUp(false);
                }
            }

            if (e.type === "mouseup") {
                if (isInBounds(e)) {
                    ground();
                }

                setLightUp(false);
            }
        };

        setDealWith(dealWith);

        return () => {
            setDealWith(()=>{});
        }
    }, []);

    function isInBounds(e) {
        if (!ref.current) return;
        
        const boundingRect = ref.current.getBoundingClientRect();
        const {left, top, right, bottom} = boundingRect;
        const {clientX: mouseX, clientY: mouseY} = e;

        return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
    }

    return (
        <div ref={ref} className={styleModule.between} style={{backgroundColor, ...style}}/>
    );
}