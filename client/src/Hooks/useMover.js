import { useState } from "react";

export default function useMover(defaultPosition) {
    const [position, setPosition] = useState(defaultPosition);

    return {
        //onMouseDown starts to track the moving of the element
        onMouseDown: e => {
            //offset is the difference between the cursor and element coordinates
            //(the cursor is being tracked because it's easier)
            const offset = {};
            const [xOffset, yOffset] = [e.screenX - position.x, e.screenY - position.y];
            offset.x = xOffset;
            offset.y = yOffset;

            //when the cursor is moved, we change the position, taking the offset into account
            const onMouseMove = e => {
                const { screenX, screenY } = e;

                setPosition(
                    { x: screenX - offset.x, y: screenY - offset.y }
                );
            };
            //when the mouse is up, the movement has stopped
            //and the event listeners are removed
            const onMouseUp = e => {
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("mouseup", onMouseUp);
            };

            window.addEventListener("mousemove", onMouseMove);

            window.addEventListener("mouseup", onMouseUp);
        }, position, setPosition
    };
}
