const TopSort = {
    graphRepresentation: "adjacencyList",
    getRun: function({considers, setIsDone}) {
        const {considerGraph, considerInteger, considerPointerLine, considerArray, considerObjectArray} = considers;

        return async function(nodesIds, edgeList) {
            async function dfs(nodeId) {
                await considerInteger("node", "set", nodeId);
                await considerInteger("i1", "remove");
                await considerPointerLine(1);
                //if the node has already been visited, we do not go through it again
                // done nodes (below) have been visited, too, so once again we do not need to go through them

                await considerPointerLine(2);
                if (done[nodeId]) {
                    //the node is marked as current2, aka we've already been through it but we are visiting it again
                    // just for visual effect
                    await considerGraph(nodeId, "current2");
                    //we return the node to "done" status
                    await considerGraph(nodeId, "done");
                    await considerPointerLine(3);
                    return;
                }

                if (visited[nodeId]) {
                    //if the node has been visited but is not done, that means it's still part of the current
                    // dfs and we will return to it; we use current2 to mark it as something we've already been
                    // through, then we return it to passed (it must be in passed status if it's down the
                    // dfs stack)
                    await considerGraph(nodeId, "current2");
                    await considerGraph(nodeId, "passed");
                    await considerPointerLine(3);
                    return;
                }

                await considerPointerLine(6);

                //the node is marked as the current one
                await considerGraph(nodeId, "current");

                visited[nodeId] = true;
                await considerObjectArray("visited", "setAt", nodeId, true);

                await considerPointerLine(8);
                await considerInteger("i1", "add", 0);
                for (let i1 = 0; i1 < edgeList.get(nodeId).size; i1++) {
                    await considerInteger("i1", "set", i1);
                    await considerPointerLine(9);
                    const nextNodeId = edgeList.get(nodeId).get(i1).to;

                    //if we are going to the same node, we only show it through "current3" and then return it
                    // to current as we're either going to a new node or are done with this node
                    if (nextNodeId === nodeId) {
                        await considerPointerLine(2);
                        await considerGraph(nodeId, "current3");
                        await considerPointerLine(3);
                        await considerGraph(nodeId, "current");
                        await considerPointerLine(8);
                        continue;
                    }

                    await considerGraph(nodeId, "passed");
                    await dfs(nextNodeId);
                    await considerGraph(nodeId, "current");
                    await considerPointerLine(8);
                }
                await considerInteger("i1", "remove");
                await considerPointerLine(10);

                await considerGraph(nodeId, "done");
                done[nodeId] = true;

                await considerPointerLine(12);
                nodesTopSorted.unshift(nodeId);
                await considerArray("nodesTopSorted", "unshift", nodeId);
            }

            await considerPointerLine(15);
            const nodesTopSorted = [];
            await considerArray("nodesTopSorted", "add", []);
            await considerPointerLine(16);
            const visited = {};
            await considerObjectArray("visited", "add", []);

            //done is used purely for styling purposes, it contains visited nodes that have also been completely
            // dfs-ed, so if we hit a simply visited node, it means it's still down the dfs chain (and done ones
            // aren't)
            const done = {};

            await considerPointerLine(18);
            await considerInteger("i", "add", 0);
            for (let i = 0; i < nodesIds.size; i++) {
                await considerInteger("i", "set", i);
                await considerPointerLine(19);
                if (!visited[i]) await dfs(nodesIds.get(i));
                await considerPointerLine(18);
            }
            await considerPointerLine(20);
            await considerInteger("i", "remove");

            setIsDone();
            return;
        }
    }
};

export default TopSort;