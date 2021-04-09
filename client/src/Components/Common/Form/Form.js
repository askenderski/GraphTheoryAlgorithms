import ControlledTextInputWithValidation
    from "../../Common/ControlledTextInputWithValidation/ControlledTextInputWithValidation";
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {useStateWithShallowMerge} from "../../../Hooks/useStateWithShallowMerge";

function inputTupleToControlledInput([value, setValue, validator, displayName, rest], {errors, setErrors}) {
    return <ControlledTextInputWithValidation
        key={displayName}
        displayName={displayName}
        value={value}
        setValue={setValue}
        validate={validator}
        errors={errors}
        setErrors={setErrors}
        {...rest}
    />;
}

export default function Form(
    {input: {inputTuples, submitValue}, service: {service, errors: otherFormErrors, serviceArguments, redirectPath, dealWithResponse=res=>res}}
    ) {
    const history = useHistory();
    const [formResponseErrors, setFormResponseErrors] = useState([]);
    const [formPreSubmitErrors, setFormPreSubmitErrors] = useStateWithShallowMerge({});
    console.log(otherFormErrors)
    console.log(formPreSubmitErrors)
    console.log(formResponseErrors)

    useEffect(() => {
        console.log("lol")
        setFormPreSubmitErrors({otherFormErrors: otherFormErrors || []});
    }, [otherFormErrors]);

    function handleSubmit(e) {
        e.preventDefault();

        console.log(formPreSubmitErrors)
        console.log(Object.values(formPreSubmitErrors).flat(1))
        console.log(Object.values(formPreSubmitErrors).flat(1).length)
        if (Object.values(formPreSubmitErrors).flat(1).length > 0) {
            return;
        }
        console.log("aaaaaaa")

        service(serviceArguments)
            .then(res=>{
                history.push(redirectPath);

                return res;
            })
            .then(res=>{
                dealWithResponse(res);
            })
            .catch(({message})=>{
                setFormResponseErrors([message || "Couldn't register user"]);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            {
                formResponseErrors.length > 0 ?
                    <div>{formResponseErrors.map(error=><div key={error}>{error}</div>)}</div> :
                    null
            }
            {
                inputTuples.map(inputTuple=>
                    inputTupleToControlledInput(
                        inputTuple,
                        {
                            errors: formPreSubmitErrors[inputTuple[3]],
                            setErrors: errors => setFormPreSubmitErrors({[inputTuple[3]]: errors})
                        }
                        )
                )
            }
            <input type="submit" value={submitValue} />
        </form>
    );
};