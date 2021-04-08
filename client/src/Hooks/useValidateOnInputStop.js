import {useEffect, useState} from "react";

export default function useValidateOnInputStop(validate, {defaultValue, time=250}={}) {
    const [validationTimeout, setValidationTimeout] = useState();
    const [errors, setErrors] = useState(validate(defaultValue));

    useEffect(() => {
        return () => {
            clearTimeout(validationTimeout);
        }
    }, [validationTimeout]);

    const stopTyping = lastValue => {
        setErrors(validate(lastValue));
        setValidationTimeout(undefined);
    };

    function setValue(value) {
        const newTimeout = setTimeout(() => {
            stopTyping(value);
        }, time);

        setValidationTimeout(newTimeout);
    }

    return { setValue, errors };
}