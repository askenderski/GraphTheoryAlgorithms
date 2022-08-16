export default function GetTopSorter({consider, setIsDone, setResult}) {
    return {
        graphRepresentation: "adjacencyList",
        algorithm: async function(nodes, edgeList) {
            async function dfs(node) {
                //if the node has already been visited, we do not go through it again
                // done nodes (below) have been visited, too, so once again we do not need to go through them

                if (done[node]) {
                    //the node is marked as current2, aka we've already been through it but we are visiting it again
                    // just for visual effect
                    await consider(node, "current2");
                    //we return the node to "done" status
                    await consider(node, "done");
                    return;
                }

                if (visited[node]) {
                    //if the node has been visited but is not done, that means it's still part of the current
                    // dfs and we will return to it; we use current2 to mark it as something we've already been
                    // through, then we return it to passed (it must be in passed status if it's down the
                    // dfs stack)
                    await consider(node, "current2");
                    await consider(node, "passed");
                    return;
                }

                //the node is marked as the current one
                await consider(node, "current");

                visited[node] = true;

                for (let i = 0; i < edgeList.get(node).size; i++) {
                    //if we are going to the same node, we only show it through "current3" and then return it
                    // to current as we're either going to a new node or are done with this node
                    if (edgeList.get(node).get(i).to === node) {
                        await consider(node, "current3");
                        await consider(node, "current");
                        continue;
                    }

                    await consider(node, "passed");
                    await dfs(edgeList.get(node).get(i).to);
                    await consider(node, "current");
                }

                await consider(node, "done");
                done[node] = true;

                nodesTopSorted.unshift(node);
                setResult(nodesTopSorted);
            }

            const nodesTopSorted = [];
            const visited = [];
            const done = [];

            for (let i = 0; i < nodes.size; i++) {
                if (!visited[i]) await dfs(i);
            }

            setIsDone();
            return;
        }
    };
}