export function FormOtherErrors({errors}: {errors: string[]}) {
    return <div>{errors.map(error=><span>{error}</span>)}</div>;
}