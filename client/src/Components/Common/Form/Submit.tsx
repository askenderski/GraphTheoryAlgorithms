import { useContext } from "react";
import { useHistory } from "react-router";
import FormContext from "Contexts/Form";

export default function Submit({value}: {value: string}) {
    const history = useHistory();

    const {
        preSubmitErrors,
        service: {service, getArguments, redirectPath, dealWithResponse},
        formState,
        setResponseErrors,
        setHandleSubmit
    } = useContext(FormContext);

    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (Object.values(preSubmitErrors).flat(1).length > 0) {
            return;
        }
        
        service(getArguments(formState))
            .then((res: any)=>{
                history.push({pathname: redirectPath});

                return res;
            })
            .then((res: any)=>{
                dealWithResponse(res);
            })
            .catch(({message}: Error)=>{
                setResponseErrors([message || "Couldn't register user"]);
            });
    }

    setHandleSubmit(handleSubmit);

    return <input type="submit" value={value} />;
}