export default function Pointer({point}: {point: boolean}) {
    return <span>{point ? ">" : " "}</span>;
}