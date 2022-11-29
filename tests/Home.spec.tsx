import { render, act, renderHook } from "@testing-library/react";
import React from "react";
import WelcomeModal from "../components/WelcomeModal";
import Home from "../pages";
import { useToDoItems } from "../utils/useToDoItems";

describe("Home", () => {
  const mountComponent = () => render(<Home />);

  it("should render WelcomeModal with default state", async () => {
    const component = mountComponent();
    const modal = await component.findAllByRole(WelcomeModal);
    expect(modal.length).not.toBe(0);
  });

  it("should show 'You haven't added any task yet.' if don't have any tasks", async () => {
    const stateAfterCloseModal = false;
    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([stateAfterCloseModal, jest.fn()]);
    const { getByText } = mountComponent();
    expect(getByText(/You haven't added any task yet/i));
  });
});
