import useValidateOnInputStop from "../Hooks/useValidateOnInputStop";
import React, {useEffect, useContext} from "react";
import usePrevious from "../Hooks/usePrevious";
import FormContext from "Contexts/Form";

export interface IControlledElementProps {
    value: any,
    setValue: (arg: any)=>any,
    errors: string[]
}

export default function withValidateOnInputStop<T>
(WrappedComponent: React.ComponentType<T & IControlledElementProps>) {
    return function Component(
        {validate, time=250, validateDefault=true, valueName, ...restProps}:
        {validate: (prop: any)=>string[], time?: number, validateDefault?: boolean, valueName: string} & T
    ) {
        const value = useContext(FormContext).formState[valueName];
        const { setPreSubmitErrors, setFormState } = useContext(FormContext);
        const setValue = (value: any) => setFormState({[valueName]: value});
        
        const {setValue: setValidatorValue, errors: validationErrors} = useValidateOnInputStop(
            validate, {defaultValue: value, time, validateDefault}
        );
        const previousValidationErrors = usePrevious(validationErrors);

        useEffect(() => {
            const errorsArrayWithoutPreviousValidationErrors =
                [...validationErrors.filter(error => ! previousValidationErrors.includes(error))];
            const newValidationErrors = validationErrors;

            setPreSubmitErrors({
                [valueName]: [...errorsArrayWithoutPreviousValidationErrors, ...newValidationErrors]
            });
        }, [validationErrors]);

        function changeValue(value: any) {
            setValue(value);

            setValidatorValue(value);
        }

        const props = {
            ...{value, setValue: changeValue, errors: validationErrors} as IControlledElementProps,
            ...restProps as T
        };

        return <WrappedComponent {...props}/>;
    };
}