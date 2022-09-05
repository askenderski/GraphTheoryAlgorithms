import styleModule from "./Between.module.css";
import { useEffect, useState, useRef } from "react";

export default function Between({currentlyMovingElement, ground, style}) {
    const [lightUp, setLightUp] = useState(false);
    const ref = useRef();

    const backgroundColor = lightUp ? "blue" : "";

    useEffect(()=>{
        if (!currentlyMovingElement) {
            setLightUp(false);
            return;
        }

        function isInBounds(e) {
            const boundingRect = ref.current.getBoundingClientRect();
            const {left, top, right, bottom} = boundingRect;
            const {clientX: mouseX, clientY: mouseY} = e;

            return mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;
        }

        const onMouseMove = e=>{
            if (isInBounds(e)) {
                setLightUp(true);
            } else {
                setLightUp(false);
            }
        };

        const onMouseUp = e => {
            if (isInBounds(e)) {
                ground(currentlyMovingElement);
            }
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);

        return ()=>{
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [currentlyMovingElement]);

    return (
        <div ref={ref} className={styleModule.between} style={{backgroundColor, ...style}}/>
    );
}