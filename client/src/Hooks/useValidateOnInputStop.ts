import {useEffect, useState} from "react";

export default function useValidateOnInputStop(
    validate: (arg: any)=>string[],
    {defaultValue, time, validateDefault = false}:
    {defaultValue?: any, time?: number, validateDefault?: boolean}={}
) {
    const [validationTimeout, setValidationTimeout] = useState<ReturnType<typeof setTimeout>>();
    const [errors, setErrors] = useState(validateDefault ? validate(defaultValue) : []);

    useEffect(() => {
        return () => {
            clearTimeout(validationTimeout);
        }
    }, [validationTimeout]);

    const stopTyping = (lastValue: any) => {
        setErrors(validate(lastValue));
        setValidationTimeout(undefined);
    };

    function setValue(value: any) {
        const newTimeout = setTimeout(() => {
            stopTyping(value);
        }, time);

        setValidationTimeout(newTimeout);
    }

    return { setValue, errors };
}