import useValidateOnInputStop from "../Hooks/useValidateOnInputStop";

export default function withValidateOnInputStop(WrappedComponent) {
    return function ({validate, value, setValue, time, errors: prevErrors = [], ...restProps}) {
        const {setValue: setValidatorValue, errors} = useValidateOnInputStop(validate, {defaultValue: value, time});

        function changeValue(value) {
            setValue(value);

            setValidatorValue(value);
        }

        return <WrappedComponent value={value} setValue={changeValue} errors={[...prevErrors, ...errors]} {...restProps}/>;
    };
}