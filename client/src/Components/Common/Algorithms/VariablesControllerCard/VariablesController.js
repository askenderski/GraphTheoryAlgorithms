import { useEffect, useState } from "react";
import useStateWithShallowMerge from "../../../../Hooks/useStateWithShallowMerge";
import IntegerVariableCard from "./IntegerVariableCard/IntegerVariableCard";
import { useVariableHandlers } from "./useVariableHandlers";

export default function VariablesController() {
    const {variables} = useVariableHandlers();
    const [order, setOrder] = useState([]);
    const [moving, setMoving] = useStateWithShallowMerge({});

    useEffect(()=>{
        setOrder(Object.keys(variables));
    }, [variables]);

    useEffect(()=>{
        setMoving(Object.keys(variables).reduce((a,b)=>({...a,[b]: false}),{}));
    }, [variables]);

    return <div>{
        order.map(variableName=>
            <IntegerVariableCard moving={moving[variableName]} setMoving={status=>setMoving({[variableName]: status})}
            variableValue={variables[variableName]} variableName={variableName} />)
        }</div>;
}