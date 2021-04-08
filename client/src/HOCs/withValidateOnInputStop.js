import useValidateOnInputStop from "../Hooks/useValidateOnInputStop";

export default function withValidateOnInputStop(WrappedComponent) {
    return function ({validate, value, setValue, time, errors: prevErrors = [], validateDefault, ...restProps}) {
        const {setValue: setValidatorValue, errors} = useValidateOnInputStop(
            validate, {defaultValue: value, time, validateDefault}
            );

        function changeValue(value) {
            setValue(value);

            setValidatorValue(value);
        }

        return <WrappedComponent value={value} setValue={changeValue} errors={[...prevErrors, ...errors]} {...restProps}/>;
    };
}