export default function ControlledTextInput({value, setValue, errors=[]}) {
    return (
        <div>
            {
                errors.length > 0
                    ? <div>{errors.map(error=><div key={error}>{error}</div>)}</div>
                    : null
            }
            <input
                data-testid="controlled-text-input"
                value={value}
                onChange={({target})=>setValue(target.value)}
            />
        </div>
    );
};