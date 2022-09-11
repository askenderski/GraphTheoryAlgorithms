import { Fragment, useEffect, useState, useRef } from "react";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import Between from "./Between/Between";
import VariableCard from "./VariableCard/VariableCard";
import { useVariableHandlers } from "./useVariableHandlers";
import usePrevious from "../../../../Hooks/usePrevious";

function BetweenIfNeeded({betweenExists, ...rest}) {
    if (betweenExists)
        return <Between {...rest}/>;
    
    return null;
}

export default function VariablesController({parsers}) {
    function getGround(i) {
        return ()=>{
            const varName = currentlyMovingElementRef.current;

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
    const [betweenElementExists, setBetweenElementExists] = useStateWithShallowMerge({0: true});
    const currentlyMovingElementRef = useRef();

    function setCurrentlyMovingElement(el) {
        currentlyMovingElementRef.current = el;
    }

    const lastBetween =
        <Between style={{flexGrow: 1}} ground={getGround(order.length)}
        setDealWith={func=>setDealWiths({0: func})}/>;
    const prevVariables = usePrevious(variables);

    useEffect(()=>{
        if (
            Object.keys(variables).every(variable => prevVariables[variable] !== undefined) &&
            Object.keys(prevVariables || {}).every(variable => prevVariables[variable] !== undefined)
        ) return;

        setOrder(Object.keys(variables));
        setMoving(Object.keys(variables).reduce((a,b)=>({...a,[b]: false}),{}));
        setBetweenElementExists(Object.keys(variables).reduce((a,b)=>({...a,[b]: true}),{0: true}));
    }, [variables]);

    const dealWithsRef = useRef();

    function setDealWiths(val) {
        dealWithsRef.current = {...dealWithsRef.current, ...val};
    }

    return (
        <div
        onMouseDown={e=>{
            setTimeout(()=>Object.values(dealWithsRef.current).forEach(dealWith=>{
                dealWith(e);
            }), 0);
        }}
        onMouseMove={e=>{
            if (!currentlyMovingElementRef.current) return;

            Object.values(dealWithsRef.current).forEach(dealWith=>{
                dealWith(e);
            });
        }}
        onMouseUp={e=>{
            if (!currentlyMovingElementRef.current) return;

            Object.values(dealWithsRef.current).forEach(dealWith=>{
                dealWith(e);
            });
        }}
        style={{height: "100%", display: "flex", flexDirection: "column", overflowY: "scroll"}}
        >{
            order.map((variableName, i)=>
                <Fragment key={variableName}>
                    <BetweenIfNeeded
                    betweenExists={betweenElementExists[variableName]}
                    ground={getGround(i)}
                    setDealWith={func=>setDealWiths({[variableName]: func})}
                    />
                    <VariableCard moving={moving[variableName]}
                    parser={parsers[variableName] || (val=>val)}
                    setMoving={status=>{
                        setMoving({[variableName]: status});
                        setCurrentlyMovingElement(variableName);
                        setBetweenElementExists({[variableName]: false});
                    }}
                    setStop={()=>{
                        setCurrentlyMovingElement(undefined);
                    }}
                    variableType={variables[variableName].type}
                    variableValue={variables[variableName].value} variableName={variableName}
                    />
                </Fragment>
            )
        }{lastBetween}</div>
    );
}