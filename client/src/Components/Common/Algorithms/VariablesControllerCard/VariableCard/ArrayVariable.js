export default function ArrayVariable({variableValue}) {
    return <ul style={{whiteSpace: "pre", overflowY:"hidden", overflowX: "scroll", height: "100%"}}>{
        variableValue.map(val=><li style={{display: "inline-block"}}>{val}</li>)
    }</ul>;
};