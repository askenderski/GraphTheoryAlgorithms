export default function GetTopSorter({consider, setIsDone, setResult}) {
    return {
        graphRepresentation: "adjacencyList",
        algorithm: async function(nodes, edgeList) {
            async function runAlgorithm() {
                async function dfs(node) {
                    if (visited[node]) {
                        await consider(node, "current2");
                        await consider(node, "done");
                        return;
                    }

                    await consider(node, "current");

                    visited[node] = true;

                    for (let i = 0; i < edgeList.get(node).size; i++) {
                        if (i === node) {
                            await consider(node, "current3");
                            await consider(node, "current");
                            continue;
                        }

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

                for (let i = 0; i < nodes.size; i++) {
                    await dfs(i);
                }

                setIsDone();
            }

            runAlgorithm();

            return;
        }
    };
}