const TopSortText = `function dfs(node) {
    if (visited[node]) {
        return;
    }

    visited[node] = true;

    for (let i1 = 0; i1 < edgeList[node].length; i1++) {
        dfs(edgeList[node][i1].to);
    }

    nodesTopSorted.unshift(node);
}

const nodesTopSorted = [];
const visited = [];

for (let i = 0; i < nodes.length; i++) {
    if (!visited[i]) dfs(i);
}`;

export default TopSortText;