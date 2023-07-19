export default function ObjectArrayVariable({variableValue}: {variableValue: [string, any][]}) {
    return (
        <div style={{
            overflow: "auto",
            height: "100%",
            width: "100%",
            display: "inline-block"
        }}>
            <table style={{whiteSpace: "pre", overflow: "scroll", height: "100%", width: "100%", border: "1px solid"}}>
                <thead>
                    {
                        variableValue
                            .map(([key])=><th style={{border: "1px solid", whiteSpace: "pre"}}>{key}</th>)
                    }
                </thead>
                <tbody>
                    <tr>
                        {
                            variableValue
                                .map(([key,value])=><td style={{border: "1px solid", whiteSpace: "pre"}}>{value}</td>)
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
};