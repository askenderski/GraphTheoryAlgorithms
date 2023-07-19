import { IControlledElementProps } from "HOCs/withValidateOnInputStop";
import React, { InputHTMLAttributes } from "react";

export interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    displayName: string, placeholder?: string
}

type IControlledTextInputProps = ITextInputProps & IControlledElementProps;

const ControlledTextInput: React.ComponentType<IControlledTextInputProps> = function (
    {value, setValue, errors=[], displayName, placeholder=displayName, ...restProps}
    ) {
    return (
        <div>
            {
                errors.length > 0
                    ? <div>{errors.map(error=><div key={error}>{error}</div>)}</div>
                    : null
            }
            <label>{displayName}</label>
            <input
                data-testid="controlled-text-input"
                value={value}
                onChange={({target})=>setValue(target.value)}
                placeholder={placeholder}
                {...restProps}
            />
        </div>
    );
};

export default ControlledTextInput;