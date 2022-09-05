import { useState, useRef, useEffect } from "react";

export default function useMover(defaultPosition, options) {
    const {onMovementStart=()=>{}, onMovementStop=()=>{}} = options;

    const [position, setPosition] = useState(defaultPosition);
    const ref = useRef();

    return {
        //onMouseDown starts to track the moving of the element
        onMouseDown: e => {
            //offset is the difference between the cursor and element coordinates
            //(the cursor is being tracked because it's easier)
            onMovementStart();

            const boundingClientRect = ref.current?.getBoundingClientRect();

            const offset = {};
            const [xOffset, yOffset] = [e.clientX - boundingClientRect.left, e.clientY - boundingClientRect.top];
            offset.x = xOffset;
            offset.y = yOffset;

            //when the cursor is moved, we change the position, taking the offset into account
            const onMouseMove = e => {
                const { clientX, clientY } = e;

                setPosition(
                    { x: clientX - offset.x, y: clientY - offset.y }
                );
            };
            //when the mouse is up, the movement has stopped
            //and the event listeners are removed
            const onMouseUp = e => {
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