import { useEffect, useState } from "react";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import Between from "./Between/Between";
import IntegerVariableCard from "./IntegerVariableCard/IntegerVariableCard";
import { useVariableHandlers } from "./useVariableHandlers";

export default function VariablesController() {
    const {variables} = useVariableHandlers();
    const [order, setOrder] = useState([]);
    const [moving, setMoving] = useStateWithShallowMerge({});
    const [betweenElementExists, setBetweenElementExists] = useStateWithShallowMerge({});
    const [currentlyMovingElement, setCurrentlyMovingElement] = useState();
    const firstBetween = <Between currentlyMovingElement={currentlyMovingElement}/>;

    useEffect(()=>{
        setOrder(Object.keys(variables));
    }, [variables]);

    useEffect(()=>{
        setMoving(Object.keys(variables).reduce((a,b)=>({...a,[b]: false}),{}));
        setBetweenElementExists(Object.keys(variables).reduce((a,b)=>({...a,[b]: true}),{}));
    }, [variables]);

    return <div>{firstBetween}{
        order.map(variableName=>
                <>
                    <IntegerVariableCard moving={moving[variableName]}
                    setMoving={status=>{
                        setMoving({[variableName]: status});
                        setCurrentlyMovingElement(variableName);
                        setBetweenElementExists({[variableName]: false});
                    }}
                    setStop={()=>setCurrentlyMovingElement(undefined)}
                    variableValue={variables[variableName]} variableName={variableName}
                    />
                    {betweenElementExists[variableName] ?
                        <Between currentlyMovingElement={currentlyMovingElement}/> : null}
                </>
            )
        }</div>;
}