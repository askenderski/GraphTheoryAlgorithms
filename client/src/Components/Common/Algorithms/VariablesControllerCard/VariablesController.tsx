import { Fragment, useEffect, useState, useRef } from "react";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import Between, { IBetweenProps } from "./Between/Between";
import VariableCard from "./VariableCard/VariableCard";
import { useVariableHandlers } from "./useVariableHandlers";

function BetweenIfNeeded({betweenExists, ...rest}: IBetweenProps & {betweenExists: boolean}) {
    if (betweenExists)
        return <Between {...rest}/>;
    
    return null;
}

function useOrder(
    {
        variables,
        setMoving,
        setBetweenElementExists
    }:
    {
        variables: {[key:string]:any},
        setMoving: (arg: {[key:string]: boolean})=>any,
        setBetweenElementExists: (arg: {[key:string]: boolean})=>any
    }
) {
    const [order, setOrder1] = useState<string[]>([]);
    function setOrder(e: string[]) {
        setOrder1(e);
    }
    // const prevVariables = usePrevious(variables);
    
    useEffect(()=>{
        // if (
        //     Object.keys(variables).every(variable => prevVariables[variable] !== undefined) &&
        //     Object.keys(prevVariables || {}).every(variable => prevVariables[variable] !== undefined)
        // ) return;

        setOrder(Object.keys(variables));
        setMoving(Object.keys(variables).reduce((a,b)=>({...a,[b]: false}),{}));
        setBetweenElementExists(Object.keys(variables).reduce((a,b)=>({...a,[b]: true}),{0: true}));
    }, [variables]);

    return [order, setOrder] as [string[], (arg: string[])=>any];
}

export default function VariablesController({parsers}: {parsers: {[key:string]:(prop:any)=>any}}) {
    function getGround(i: number) {
        return ()=>{
            const varName = currentlyMovingElementRef.current as string;

            setMoving({[varName]: false});
            setBetweenElementExists({[varName]: true});
            
            const orderIndexOfVarName = order.findIndex(a=>a===varName);

            if (orderIndexOfVarName < i) {
                console.log(orderIndexOfVarName)
                console.log(i)
                setOrder(
                    order
                    .slice(0,orderIndexOfVarName)
                    .concat(...order.slice(orderIndexOfVarName+1,i))
                    .concat([varName])
                    .concat(order.slice(i))
                );
            } else {
                setOrder(
                    order
                    .slice(0,i)
                    .concat([varName])
                    .concat(...order.slice(i,orderIndexOfVarName))
                    .concat(order.slice(orderIndexOfVarName+1))
                );
            }
        };
    }

    const {variables} = useVariableHandlers();

    const [moving, setMoving] = useStateWithShallowMerge<{[key:string]:boolean}>({});
    const [betweenElementExists, setBetweenElementExists] = useStateWithShallowMerge<{[key:string]:boolean}>({0: true});
    const currentlyMovingElementRef = useRef<string | undefined>();
    const [order, setOrder] = useOrder({variables, setMoving, setBetweenElementExists}) as
        [string[], (arg: string[])=>any];

    function setCurrentlyMovingElement(el: string | undefined) {
        currentlyMovingElementRef.current = el;
    }

    const controllerRef = useRef<HTMLDivElement>(null);

    const lastGround = getGround(order.length);
    const lastBetween =
        <Between style={{flexGrow: 1}} ground={lastGround}
        setDealWith={func=>setDealWiths({0: func})}
        controllerRef={controllerRef}/>;

    const dealWithsRef = useRef<{[key: string]: Function}>({});

    function setDealWiths(val: {[key: string]: Function}) {
        dealWithsRef.current = {...dealWithsRef.current, ...val};
    }

    return (
        <div
        ref = {controllerRef}
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
            order.map((variableName, i)=> {
                return <Fragment key={variableName}>
                    <BetweenIfNeeded
                    betweenExists={betweenElementExists[variableName]}
                    ground={getGround(i)}
                    setDealWith={func=>setDealWiths({[variableName]: func})}
                    controllerRef={controllerRef}
                    />
                    <VariableCard
                        moving={moving[variableName] as boolean}
                        parser={parsers[variableName] || ((val: any)=>val)}
                        setMoving={(status: boolean)=>{
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
            }
            )
        }{lastBetween}</div>
    );
}