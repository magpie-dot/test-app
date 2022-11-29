import { act, render, renderHook } from "@testing-library/react";
import React, { RefObject } from "react";
import { useToDoItems } from "./useToDoItems";

describe("useToDoItems", () => {
  it("default length of 'tasks' array should be 0", () => {
    const { result } = renderHook(() => useToDoItems());
    expect(result.current.tasks.length).toBe(0);
  });

  it("add new task to useState tasks", () => {
    const task = { current: { value: "Zrób zakupy" } };
    const { result } = renderHook(() => useToDoItems());
    expect(result.current.tasks.length).toBe(0);
    act(() => {
      result.current.addToDoItem(task as RefObject<HTMLInputElement>);
    });
    expect(result.current.tasks.length).toBe(1);
  });

  it("remove second task from tasks", () => {
    const firstTask = { current: { value: "Zrób zakupy" } };
    const secondTask = { current: { value: "Zrób zakupy" } };
    const thirdTask = { current: { value: "Zrób zakupy" } };

    const { result } = renderHook(() => useToDoItems());
    expect(result.current.tasks.length).toBe(0);

    act(() => {
      result.current.addToDoItem(firstTask as RefObject<HTMLInputElement>);
    });
    act(() => {
      result.current.addToDoItem(secondTask as RefObject<HTMLInputElement>);
    });
    act(() => {
      result.current.addToDoItem(thirdTask as RefObject<HTMLInputElement>);
    });
    expect(result.current.tasks.length).toBe(3);

    const id = result.current.tasks[1].id;

    act(() => {
      result.current.removeToDoItem(id);
    });
    expect(result.current.tasks.length).toBe(2);
  });

  it("mark first task as 'done'", () => {
    const firstTask = { current: { value: "Zrób zakupy" } };
    const { result } = renderHook(() => useToDoItems());
    expect(result.current.tasks.length).toBe(0);

    act(() => {
      result.current.addToDoItem(firstTask as RefObject<HTMLInputElement>);
    });
    console.log(result.current.tasks);

    expect(result.current.tasks[0].done).toBe(false);

    const id = result.current.tasks[0].id;

    act(() => {
      result.current.markAsDone(id);
    });
    expect(result.current.tasks[0].done).toBe(true);
  });
});
