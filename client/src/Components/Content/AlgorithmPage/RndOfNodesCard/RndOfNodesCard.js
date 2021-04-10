import {getHandlers} from "../../../../Tests/Utilities/algorithmHandlers";
import {useState} from "react";
import {Rnd} from "react-rnd";
import NodesCard from "../NodesCard/NodesCard";

export default function RndOfNodesCard({nodes, setNodes}) {
    const handlers = getHandlers(nodes, setNodes);

    const [nodesCardSize, setNodesCardSize] = useState({width: 200, height: 150});
    const [nodesCardPosition, setNodesCardPosition] = useState({x: 100, y: 100});

    const [isScrolling, setIsScrolling] = useState(false);

    return <Rnd
        size={{width: nodesCardSize.width, height: nodesCardSize.height}}
        position={{x: nodesCardPosition.x, y: nodesCardPosition.y}}
        onDragStop={(e, d) => {
            if (isScrolling) return setIsScrolling(false);

            setNodesCardPosition({x: d.x, y: d.y});
        }}
        onResize={
            (e, direction, ref, delta, position) => {
                setNodesCardSize({
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                });
            }
        }
    >
        <NodesCard
            size={nodesCardSize}
            nodes={nodes}
            handlers={handlers}
        />
    </Rnd>;
};