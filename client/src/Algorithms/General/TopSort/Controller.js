import Controller from "../../Controller";

export default function TopSortController({setOutputValue, ...restProps}) {
    return Controller({setResult: setOutputValue, ...restProps});
}