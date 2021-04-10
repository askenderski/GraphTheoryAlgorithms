export default function TopSort(edgeList) {
    const nodesTopSorted = [];
    const visited = [];

    for (let i = 0; i < edgeList.length; i++) {
        dfs(i, edgeList, nodesTopSorted, visited);
    }

    return nodesTopSorted;
};

function dfs(node, edgeList, nodesTopSorted, visited) {
    if (visited[node]) return;
    visited[node] = true;

    edgeList[node]
        .forEach(edge=>{
            dfs(edge.to, edgeList, nodesTopSorted, visited);
        });

    nodesTopSorted.unshift(node);
}