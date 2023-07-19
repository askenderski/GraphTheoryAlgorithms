import {useState, useCallback} from "react";
import useStateWithShallowMerge from "../../../Hooks/useStateWithShallowMerge";
import FormResponseErrors from "./FormResponseErrors";
import FormContext from "Contexts/Form";
import { FormOtherErrors } from "./FormOtherErrors";

interface IFormProps extends React.PropsWithChildren {
    service: IService,
    getStateErrors?: (arg: {[key:string]:any})=>string[]
}

export interface IService {
    service: Function,
    getArguments: Function,
    redirectPath: string,
    dealWithResponse: Function
}

export interface IHandleSubmit {
    (arg: React.FormEvent<HTMLFormElement>): any
}

export default function Form({children, service, getStateErrors=(arg: any)=>[]}: IFormProps) {
    const [responseErrors, setResponseErrors] = useState<string[]>([]);
    
    const [preSubmitErrors, setPreSubmitErrors] = useStateWithShallowMerge<{[key: string]: any}>({});
    
    const [handleSubmit, setHandleSubmit] = useState<IHandleSubmit>(()=>{});

    const [formState, setFormState] = useStateWithShallowMerge({});

    const [otherErrors, setOtherErrors] = useState<string[]>([]);

    useCallback(()=>{
        const errors = getStateErrors(formState);
        setOtherErrors(errors);
    }, [formState]);

    return (
        <FormContext.Provider
            value={{
                setResponseErrors,
                setHandleSubmit,
                preSubmitErrors,
                setPreSubmitErrors,
                formState,
                setFormState,
                service
            }}
        >
            <form onSubmit={handleSubmit}>
                <FormResponseErrors responseErrors={responseErrors}/>
                {children}
                <FormOtherErrors errors={otherErrors}/>
            </form>
        </FormContext.Provider>
    );
};