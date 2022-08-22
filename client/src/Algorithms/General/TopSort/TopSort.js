export default function GetTopSorter({consider, setIsDone, setResult}) {
    return {
        graphRepresentation: "adjacencyList",
        algorithm: async function(nodesIds, edgeList) {
            async function dfs(nodeId, index) {
                await consider("pointerLine", 1);
                //if the node has already been visited, we do not go through it again
                // done nodes (below) have been visited, too, so once again we do not need to go through them

                await consider("pointerLine", 2);
                if (done[index]) {
                    //the node is marked as current2, aka we've already been through it but we are visiting it again
                    // just for visual effect
                    await consider("graph", nodeId, "current2");
                    //we return the node to "done" status
                    await consider("graph", nodeId, "done");
                    await consider("pointerLine", 3);
                    return;
                }

                if (visited[index]) {
                    //if the node has been visited but is not done, that means it's still part of the current
                    // dfs and we will return to it; we use current2 to mark it as something we've already been
                    // through, then we return it to passed (it must be in passed status if it's down the
                    // dfs stack)
                    await consider("graph", nodeId, "current2");
                    await consider("graph", nodeId, "passed");
                    await consider("pointerLine", 3);
                    return;
                }

                await consider("pointerLine", 6);

                //the node is marked as the current one
                await consider("graph", nodeId, "current");

                visited[index] = true;

                await consider("pointerLine", 8);
                for (let i = 0; i < edgeList.get(nodeId).size; i++) {
                    await consider("pointerLine", 9);
                    const nextNodeId = edgeList.get(nodeId).get(i).to;

                    //if we are going to the same node, we only show it through "current3" and then return it
                    // to current as we're either going to a new node or are done with this node
                    if (edgeList.get(nodeId).get(i).to === nodeId) {
                        await consider("pointerLine", 2);
                        await consider("graph", nodeId, "current3");
                        await consider("pointerLine", 3);
                        await consider("graph", nodeId, "current");
                        await consider("pointerLine", 8);
                        continue;
                    }

                    await consider("graph", nodeId, "passed");
                    await dfs(nextNodeId, nodesIds.findIndex(nodeId=>nodeId===nextNodeId));
                    await consider("graph", nodeId, "current");
                    await consider("pointerLine", 8);
                }
                await consider("pointerLine", 10);

                await consider("graph", nodeId, "done");
                done[index] = true;

                await consider("pointerLine", 12);
                nodesTopSorted.unshift(index);
                setResult(nodesTopSorted);
            }

            await consider("pointerLine", 15);
            console.log("consider line 15")
            const nodesTopSorted = [];
            await consider("pointerLine", 16);
            console.log("considering line 16")
            const visited = [];

            //done is used purely for styling purposes, it contains visited nodes that have also been completely
            // dfs-ed, so if we hit a simply visited node, it means it's still down the dfs chain (and done ones
            // aren't)
            const done = [];

            await consider("pointerLine", 18);
            for (let i = 0; i < nodesIds.size; i++) {
                await consider("pointerLine", 19);
                if (!visited[i]) await dfs(nodesIds.get(i), i);
                await consider("pointerLine", 18);
            }
            await consider("pointerLine", 20);

            setIsDone();
            return;
        }
    };
}