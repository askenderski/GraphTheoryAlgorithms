import ControlledTextInputWithValidation
    from "../../Common/ControlledTextInputWithValidation/ControlledTextInputWithValidation";
import {useState} from "react";
import {useHistory} from "react-router";

function inputTupleToControlledInput([value, setValue, validator, displayName, rest]) {
    return <ControlledTextInputWithValidation
        key={displayName}
        displayName={displayName}
        value={value}
        setValue={setValue}
        validate={validator}
        {...rest}
    />;
}

export default function Form({input: {inputTuples, submitValue}, service: {service, serviceArguments, redirectPath, dealWithResponse=res=>res}}) {
    const history = useHistory();
    const [formErrors, setFormErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        setFormErrors([]);

        service(serviceArguments)
            .then(res=>{
                history.push(redirectPath);

                return res;
            })
            .then(res=>{
                dealWithResponse(res);
            })
            .catch(({message})=>{
                setFormErrors([message || "Couldn't register user"]);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                formErrors.length > 0 ?
                    <div>{formErrors.map(error=><div key={error}>{error}</div>)}</div> :
                    null
            }
            {
                inputTuples.map(inputTupleToControlledInput)
            }
            <input type="submit" value={submitValue} />
        </form>
    );
};