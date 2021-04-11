import {useState} from "react";
import {Rnd} from "react-rnd";

export default function RndOfStartAlgorithmButton({startAlgorithm}) {
    const [startButtonSize, setStartButtonSize] = useState({width: 50, height: 50});
    const [startButtonPosition, setStartButtonPosition] = useState({x: 50, y: 50});

    return <Rnd
        size={{width: startButtonSize.width, height: startButtonSize.height}}
        position={{x: startButtonPosition.x, y: startButtonPosition.y}}
        onDragStop={(e, d) => {
            setStartButtonPosition({x: d.x, y: d.y});
        }}
        onResize={
            (e, direction, ref, delta, position) => {
                setStartButtonSize({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                });
            }
        }
    >
        <button onClick={startAlgorithm}>Start</button>
    </Rnd>;
}