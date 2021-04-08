export default function ControlledTextInput(
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