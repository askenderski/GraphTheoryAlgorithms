import useValidateOnInputStop from "../Hooks/useValidateOnInputStop";
import {useEffect, useRef} from "react";
import usePrevious from "../Hooks/usePrevious";

export default function withValidateOnInputStop(WrappedComponent) {
    return function ({validate, value, setValue, time, errors = [], setErrors, validateDefault, ...restProps}) {
        const {setValue: setValidatorValue, errors: validationErrors} = useValidateOnInputStop(
            validate, {defaultValue: value, time, validateDefault}
            );
        const previousValidationErrors = usePrevious(errors);

        useEffect(() => {
            const errorsArrayWithoutPreviousValidationErrors =
                [...errors.filter(error => ! previousValidationErrors.includes(error))];
            const newValidationErrors = validationErrors;

            setErrors([...errorsArrayWithoutPreviousValidationErrors, ...newValidationErrors]);
        }, [validationErrors]);

        function changeValue(value) {
            setValue(value);

            setValidatorValue(value);
        }

        return <WrappedComponent value={value} setValue={changeValue} errors={errors} {...restProps}/>;
    };
}