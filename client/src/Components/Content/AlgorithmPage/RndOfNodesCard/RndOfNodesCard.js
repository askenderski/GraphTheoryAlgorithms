import {getHandlers} from "../../../../Tests/Utilities/algorithmHandlers";
import {useEffect, useRef, useState} from "react";
import {Rnd} from "react-rnd";
import NodesCard from "../NodesCard/NodesCard";
import nodesCardStyle from "../NodesCard/NodesCard.module.css";

const defaultSize = {
    width: "300px", height: "300px"
};
const defaultNodesCardSize = {
    ...defaultSize,
    widthWithoutScroll: defaultSize.width,
    heightWithoutScroll: defaultSize.height,
};
const defaultNodesCardPosition = {x: 100, y: 100};

export default function RndOfNodesCard({nodes, setNodes}) {
    const handlers = getHandlers(nodes, setNodes);

    const [nodesCardSize, setNodesCardSize] = useState(defaultNodesCardSize);
    const [nodesCardPosition, setNodesCardPosition] = useState(defaultNodesCardPosition);

    return <Rnd
        position={{x: nodesCardPosition.x, y: nodesCardPosition.y}}
        size={{width: nodesCardSize.width, height: nodesCardSize.height}}
        onResize={
            (e, direction, ref, delta, position) => {
                setNodesCardSize({
                    width: ref.style.width,
                    height: ref.style.height
                });
            }
        }
        disableDragging={true}
    >
        <NodesCard
            size={nodesCardSize}
            nodes={nodes}
            handlers={
                {
                    ...handlers,
                    setOffset: ({x, y}) => {
                        console.log(x, y);
                        setNodesCardPosition({x: nodesCardPosition.x+x, y: nodesCardPosition.y+y})
                    }
                }
            }
        />
    </Rnd>;
};