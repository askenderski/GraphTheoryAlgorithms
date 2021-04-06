import {useEffect, useState} from "react";

export default function withValidateOnInputStop(WrappedComponent) {
    return function ({validate, value, setValue, ...restProps}) {
        const [validationTimeout, setValidationTimeout] = useState();
        const [errors, setErrors] = useState(validate(value));

        useEffect(() => {
            return () => {
                clearTimeout(validationTimeout);
            }
        }, [validationTimeout]);

        const stopTyping = () => {
            setErrors(state => validate(state));
            setValidationTimeout(undefined);
        };

        function changeValue(value) {
            setValue(value);

            const newTimeout = setTimeout(() => {
                stopTyping(newTimeout);
            }, 1000);

            setValidationTimeout(newTimeout);
        }

        return <WrappedComponent value={value} setValue={changeValue} errors={errors} {...restProps}/>;
    };
}