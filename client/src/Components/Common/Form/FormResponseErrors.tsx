export default function FormResponseErrors({responseErrors}: {responseErrors: string[]}) {
    return <div>{responseErrors.map(error=><span>{error}</span>)}</div>;
}