import styleModule from "./Between.module.css";
import { useEffect, useState, useRef } from "react";

export interface IBetweenProps extends React.PropsWithChildren {
    ground: Function,
    style?: {[key: string]: any},
    setDealWith: (arg: Function)=>void,
    controllerRef: React.RefObject<HTMLDivElement>
}

export default function Between({ground, style={}, setDealWith, controllerRef}: IBetweenProps) {
    const [lightUp, setLightUp] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const backgroundColor = lightUp ? "blue" : "";

    //this only happens once and is a problem for lastBetween
    useEffect(()=>{
        const dealWith = (e: MouseEvent) => {
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

        ref.current?.addEventListener("mouseup", function (e) {
            console.log("done")
        });

        return () => {
            setDealWith(()=>{});
        }
    }, [ref.current, ground]);

    function isInBounds(e: MouseEvent) {
        if (!ref.current || !controllerRef.current) return;
        
        const boundingRect = ref.current.getBoundingClientRect();
        const {left, top, right, bottom} = boundingRect;
        const {clientX: mouseX, clientY: mouseY} = e;

        const {top: topController, bottom: bottomController} = controllerRef.current.getBoundingClientRect();

        return (mouseX >= left ) &&
            (mouseX <= right) &&
            (mouseY >= Math.max(top, topController)) &&
            (mouseY <= Math.min(bottom, bottomController));
    }

    return (
        <div ref={ref} className={styleModule.between} style={{backgroundColor, ...style}}/>
    );
}