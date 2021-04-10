import GetTopSorter from "../../../Algorithms/General/TopSort";

test("TopSort works on complicated graph", async () => {
    const edgeList = [
        [{to:3}],
        [{to:0},{to:2},{to:3}],
        [{to:0},{to:3}],
        []
    ];

    const res = await (await GetTopSorter({consider: () => {}}))(edgeList);
    expect(res).toEqual([1,2,0,3]);
});

[
    [
        [{to: 1}, {to: 2}],
        [],
        [{to: 1}]
    ],
    [
        [{to: 1}, {to: 2}],
        [],
        [{to: 1}],
        [{to: 0}, {to: 4}, {to: 5}],
        [{to: 1}],
        []
    ]
]
    .forEach((edgeList, i)=> {
        test(`Programmatic test ${i + 1}`, async () => {
            const res = await (await GetTopSorter({consider: () => {}}))(edgeList);

            res.forEach((node, i) => {
                edgeList[node].forEach(({to}) => {
                    expect(res.indexOf(to) > i).toBe(true);
                });
            });
        });
    });