export default function ObjectArrayVariable({variableValue}) {
    return (
        <div style={{
            overflow: "auto",
            height: "100%",
            width: "100%",
            display: "inline-block"
        }}>
            <table style={{whitseSpace: "pre", overflow: "scroll", height: "100%", width: "100%", border: "1px solid"}}>
                <thead>
                    {
                        variableValue.map(([key])=><th style={{border: "1px solid"}}>{key}</th>)
                    }
                </thead>
                <tbody>
                    <tr>
                        {
                            variableValue.map(([key,value])=><td style={{border: "1px solid"}}>{value}</td>)
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};