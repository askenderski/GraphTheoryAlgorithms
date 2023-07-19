import { useState, useRef } from "react";

type IMovementOptions = {onMovementStart?:()=>void, onMovementStop?:()=>void, fixedPosition?: boolean};

export default function useMover(defaultPosition?: {x: number, y: number}, options: IMovementOptions = {}) {
    const {onMovementStart=()=>{}, onMovementStop=()=>{}} = options;

    const [position, setPosition] = useState(defaultPosition);
    const ref = useRef<HTMLElement>();

    return {
        //onMouseDown starts to track the moving of the element
        onMouseDown: (e: React.MouseEvent) => {
            if (e.button !== 0) return;

            //offset is the difference between the cursor and element coordinates
            //(the cursor is being tracked because it's easier)
            onMovementStart();

            const boundingClientRect: {[key:string]:any} = ref.current?.getBoundingClientRect() || {};

            const offset = { x: -1, y: -1};
            const [xOffset, yOffset] = [e.clientX - boundingClientRect?.left, e.clientY - boundingClientRect?.top];
            offset.x = xOffset;
            offset.y = yOffset;

            setPosition(
                { x: e.clientX - offset.x, y: e.clientY - offset.y }
            );

            //when the cursor is moved, we change the position, taking the offset into account
            const onMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;

                setPosition(
                    { x: clientX - offset.x, y: clientY - offset.y }
                );
            };
            //when the mouse is up, the movement has stopped
            //and the event listeners are removed
            const onMouseUp = (e: MouseEvent) => {
                onMovementStop();
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        },
        position,
        setPosition,
        ref
    };
}