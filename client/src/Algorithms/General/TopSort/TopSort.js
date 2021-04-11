export default function GetTopSorter({consider, setIsDone, setResult}) {
    return {
        graphRepresentation: "edgeList",
        algorithm: async function(edgeList) {
            async function runAlgorithm() {
                async function dfs(node) {
                    console.log(consider)
                    await consider(node, "current");
                    if (visited[node]) {
                        return;
                    }

                    visited[node] = true;

                    for (let i = 0; i < edgeList.get(node).size; i++) {
                        await consider(node, "passed");
                        await dfs(edgeList.get(node).get(i).to);
                        await consider(node, "current");
                    }

                    await consider(node, "done");
                    nodesTopSorted.unshift(node);
                    setResult(nodesTopSorted);
                }

                const nodesTopSorted = [];
                const visited = [];

                console.log("sad")
                for (let i = 0; i < edgeList.size; i++) {
                    console.log(consider)
                    await dfs(i);
                }

                setIsDone();
            }

            runAlgorithm();

            return;
        }
    };
}