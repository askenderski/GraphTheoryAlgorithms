import useToggle from "../../Hooks/useToggle";
import {renderHook, cleanup} from "@testing-library/react-hooks";

afterEach(cleanup);

test("Hook is on by default", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(true);
});

test("Hook can be defaulted to false", () => {
    const { result, rerender } = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);
});

test("Hook toggles to other state when clicked once", () => {
    const { result } = renderHook(() => useToggle());

    result.current[1]();

    expect(result.current[0]).toBe(false);
});

test("Hook toggles back to same state when clicked twice", () => {
    const { result } = renderHook(() => useToggle());

    result.current[1]();
    result.current[1]();

    expect(result.current[0]).toBe(true);
});