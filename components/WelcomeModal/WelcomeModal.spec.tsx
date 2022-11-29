import WelcomeModal from ".";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("WelcomeModal", () => {
  const nameMock = false;
  const onChangeMock = jest.fn();
  const onCloseMock = jest.fn();

  const mountComponent = (
    name = nameMock,
    onChange = onChangeMock,
    onClose = onCloseMock
  ) =>
    render(<WelcomeModal name={name} onChange={onChange} onClose={onClose} />);

  it("should have disabled button when no input is typed", () => {
    const component = mountComponent();
    const button = component.getByText(/zatwierdź/i).closest("button");
    expect(button).toBeDisabled()
  });

  it("should have enabled button when input is typed", () => {
    const component = mountComponent(true);
    const { getByLabelText } = component;
    const input = getByLabelText(/your name/i);
    const button = component.getByText(/zatwierdź/i).closest("button");
    fireEvent.change(input, { target: { value: "testName" } });
    expect(input).toHaveValue("testName");
    expect(button).not.toBeDisabled()
  });

  it("should have fire modal onClose event on button click", () => {
    const component = mountComponent(true);
    const button = component.getByText(/zatwierdź/i).closest("button");
    act(() => button?.click());
    expect(onCloseMock).toHaveBeenCalled();
  });
});
