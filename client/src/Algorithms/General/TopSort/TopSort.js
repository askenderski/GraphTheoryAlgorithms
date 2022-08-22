export default function GetTopSorter({consider, setIsDone, setResult}) {
    return {
        graphRepresentation: "adjacencyList",
        algorithm: async function(nodesIds, edgeList) {
            async function dfs(nodeId, index) {
                //if the node has already been visited, we do not go through it again
                // done nodes (below) have been visited, too, so once again we do not need to go through them

                if (done[index]) {
                    //the node is marked as current2, aka we've already been through it but we are visiting it again
                    // just for visual effect
                    await consider("graph", nodeId, "current2");
                    //we return the node to "done" status
                    await consider("graph", nodeId, "done");
                    return;
                }

                if (visited[index]) {
                    //if the node has been visited but is not done, that means it's still part of the current
                    // dfs and we will return to it; we use current2 to mark it as something we've already been
                    // through, then we return it to passed (it must be in passed status if it's down the
                    // dfs stack)
                    await consider("graph", nodeId, "current2");
                    await consider("graph", nodeId, "passed");
                    return;
                }

                //the node is marked as the current one
                await consider("graph", nodeId, "current");

                visited[index] = true;

                for (let i = 0; i < edgeList.get(nodeId).size; i++) {
                    const nextNodeId = edgeList.get(nodeId).get(i).to;

                    //if we are going to the same node, we only show it through "current3" and then return it
                    // to current as we're either going to a new node or are done with this node
                    if (edgeList.get(nodeId).get(i).to === nodeId) {
                        await consider("graph", nodeId, "current3");
                        await consider("graph", nodeId, "current");
                        continue;
                    }

                    await consider("graph", nodeId, "passed");
                    await dfs(nextNodeId, nodesIds.findIndex(nodeId=>nodeId===nextNodeId));
                    await consider("graph", nodeId, "current");
                }

                await consider("graph", nodeId, "done");
                done[index] = true;

                nodesTopSorted.unshift(index);
                setResult(nodesTopSorted);
            }

            const nodesTopSorted = [];
            const visited = [];

            //done is used purely for styling purposes, it contains visited nodes that have also been completely
            // dfs-ed, so if we hit a simply visited node, it means it's still down the dfs chain (and done ones
            // aren't)
            const done = [];

            for (let i = 0; i < nodesIds.size; i++) {
                if (!visited[i]) await dfs(nodesIds.get(i), i);
            }

            setIsDone();
            return;
        }
    };
}