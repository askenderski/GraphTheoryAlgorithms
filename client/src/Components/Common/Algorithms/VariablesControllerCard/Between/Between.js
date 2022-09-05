import { useEffect, useState, useRef } from "react";

export default function Between({currentlyMovingElement}) {
    const [lightUp, setLightUp] = useState(false);
    const ref = useRef();

    const backgroundColor = lightUp ? "blue" : "";

    useEffect(()=>{
        if (!currentlyMovingElement) setLightUp(false);

        if (currentlyMovingElement) {
            const onMouseMove = e=>{
                const boundingRect = ref.current.getBoundingClientRect();
                const {left, top, right, bottom} = boundingRect;
                const {clientX: mouseX, clientY: mouseY} = e;

                if (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom) {
                    setLightUp(true);
                } else {
                    setLightUp(false);
                }
            };

            window.addEventListener("mousemove", onMouseMove);

            return window.removeEventListener.bind(window, "mousemove", onMouseMove);
        }
    }, [currentlyMovingElement]);

    return (
        <div ref={ref} style={{height: "100px", width: "100%", backgroundColor}}
        />
    );
}