import { useEffect, useState } from "react";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import Between from "./Between/Between";
import IntegerVariableCard from "./IntegerVariableCard/IntegerVariableCard";
import { useVariableHandlers } from "./useVariableHandlers";
import usePrevious from "../../../../Hooks/usePrevious";

function BetweenIfNeeded({ground, currentlyMovingElement, element, betweenExists}) {
    if (betweenExists)
        return <Between element={element} ground={ground} currentlyMovingElement={currentlyMovingElement}/>;
    
    return null;
}

export default function VariablesController() {
    function getGround(i) {
        return varName=>{
            setMoving({[varName]: false});
            setBetweenElementExists({[varName]: true});
            
            const orderIndexOfVarName = order.findIndex(a=>a===varName);

            if (orderIndexOfVarName < i) {
                setOrder(
                    order.slice(0,orderIndexOfVarName)
                    .concat(...order.slice(orderIndexOfVarName+1,i))
                    .concat(varName)
                    .concat(order.slice(i))
                );
            } else {
                setOrder(
                    order.slice(0,i)
                    .concat(varName)
                    .concat(...order.slice(i,orderIndexOfVarName))
                    .concat(order.slice(orderIndexOfVarName+1))
                );
            }
        };
    }

    const {variables} = useVariableHandlers();
    const [order, setOrder] = useState([]);
    const [moving, setMoving] = useStateWithShallowMerge({});
    const [betweenElementExists, setBetweenElementExists] = useStateWithShallowMerge({});
    const [currentlyMovingElement, setCurrentlyMovingElement] = useState();
    const lastBetween = <Between style={{flexGrow: 1}} ground={getGround(order.length)} currentlyMovingElement={currentlyMovingElement}/>;
    const prevVariables = usePrevious(variables);

    useEffect(()=>{
        if (
            Object.keys(variables).every(variable => prevVariables[variable] !== undefined) &&
            Object.keys(prevVariables || {}).every(variable => prevVariables[variable] !== undefined)
        ) return;

        setOrder(Object.keys(variables));
        setMoving(Object.keys(variables).reduce((a,b)=>({...a,[b]: false}),{}));
        setBetweenElementExists(Object.keys(variables).reduce((a,b)=>({...a,[b]: true}),{}));
    }, [variables]);

    return <div style={{height: "100%", display: "flex", flexDirection: "column"}}>{
        order.map((variableName, i)=>
                <>
                    <BetweenIfNeeded
                    betweenExists={betweenElementExists[variableName]}
                    ground={getGround(i)}
                    currentlyMovingElement={currentlyMovingElement}
                    />
                    <IntegerVariableCard moving={moving[variableName]}
                    setMoving={status=>{
                        setMoving({[variableName]: status});
                        setCurrentlyMovingElement(variableName);
                        setBetweenElementExists({[variableName]: false});
                    }}
                    setStop={()=>{
                        setCurrentlyMovingElement(undefined);
                    }}
                    variableValue={variables[variableName]} variableName={variableName}
                    />
                </>
            )
        }{lastBetween}</div>;
}