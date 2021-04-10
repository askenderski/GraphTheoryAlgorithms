export default async function GetTopSorter({consider}) {
    return async function (edgeList) {
        async function dfs(node) {
            await consider(node, "current");
            if (visited[node]) {
                return;
            }

            visited[node] = true;

            for (const toNode of edgeList[node]) {
                await consider(node, "passed");
                await dfs(toNode.to);
                await consider(node, "current");
            }

            await consider(node, "done");
            nodesTopSorted.unshift(node);
        }

        const nodesTopSorted = [];
        const visited = [];

        for (let i = 0; i < edgeList.length; i++) {
            await dfs(i);
        }

        return nodesTopSorted;
    };
}