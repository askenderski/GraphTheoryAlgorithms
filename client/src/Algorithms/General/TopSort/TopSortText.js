const TopSortText = `
function dfs(node) {
    if (visited[node]) {
        return;
    }

    visited[node] = true;

    for (let i = 0; i < edgeList[node].length; i++) {
        dfs(edgeList[node][i].to);
    }

    nodesTopSorted.unshift(node);
}

const nodesTopSorted = [];
const visited = [];

for (let i = 0; i < nodes.length; i++) {
    if (!visited[i]) dfs(i);
}
`.trim();

console.log(TopSortText)

export default TopSortText;