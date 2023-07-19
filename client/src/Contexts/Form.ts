import { IHandleSubmit, IService } from "Components/Common/Form/Form";
import {createContext} from "react";

export interface IFormContext {
    setResponseErrors: (responseErrors: string[])=>any,
    setHandleSubmit: (handleSubmit: IHandleSubmit)=>any,
    preSubmitErrors: {[key: string]: any},
    setPreSubmitErrors: (arg: {[key: string]: any})=>any,
    formState: {[key: string]: any},
    setFormState: (arg: {[key:string]: any})=>any,
    service: IService
}

const FormContext = createContext<IFormContext>({
    setHandleSubmit: (arg: IHandleSubmit)=>{},
    setResponseErrors: (arg: string[])=>{},
    preSubmitErrors: {},
    setPreSubmitErrors: (arg)=>{},
    formState: {},
    setFormState: (arg: {[key: string]: any})=>{},
    service: {
        service: ()=>{},
        getArguments: ()=>{},
        redirectPath: "",
        dealWithResponse: ()=>{}
    }
});

export default FormContext;