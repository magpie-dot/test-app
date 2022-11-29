import { renderHook, act } from "@testing-library/react";
import useCounter from "./useCounter";


describe('useCounter', () => {
  it("Default value of `count` will be zero", () => {
    const { result } = renderHook(useCounter);

    expect(result.current.count).toBe(0);
    act(() => result.current.increment())
    expect(result.current.count).toBe(1);
    act(() => result.current.decrement())
    expect(result.current.count).toBe(0);
  });
});