import GetTopSorter from "../../../Algorithms/General/TopSort/TopSort";
import {List} from "immutable";
import {waitFor} from "@testing-library/react";

test("TopSort works on complicated graph", async () => {
    const edgeList = List.of(
        List.of({to:3}),
        List.of({to:0},{to:2},{to:3}),
        List.of({to:0},{to:3}),
        List.of()
    );

    let isDone = false;
    let result;

    const res = await GetTopSorter({consider: () => {},
        setIsDone: () => isDone = true,
        setResult: newResult => result = newResult
    }).algorithm(edgeList);

    await waitFor(() => expect(isDone).toBe(true));
    expect(result).toEqual([1,2,0,3]);
});

List.of(
    List.of(
        List.of({to: 1}, {to: 2}),
        List.of(),
        List.of({to: 1})
    ),
    List.of(
        List.of({to: 1}, {to: 2}),
        List.of(),
        List.of({to: 1}),
        List.of({to: 0}, {to: 4}, {to: 5}),
        List.of({to: 1}),
        List.of()
    )
)
    .forEach((edgeList, i)=> {
        test(`Programmatic test ${i + 1}`, async () => {
            let isDone = false;
            let result;

            const res = await GetTopSorter({consider: () => {},
                setIsDone: () => isDone = true,
                setResult: newResult => result = newResult
            }).algorithm(edgeList);

            await waitFor(() => expect(isDone).toBe(true));

            result.forEach((node, i) => {
                edgeList.get(node).forEach(({to}) => {
                    expect(result.indexOf(to) > i).toBe(true);
                });
            });
        });
    });