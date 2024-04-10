import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "./login";

const checkAuthorization = jest.fn();
const mockedOnAuthorise = jest.fn();
const mockedOnLoinFail = jest.fn();

const MockLogin = () => {
  return (
    <Login
      isWaiting={false}
      onAuthorise={mockedOnAuthorise}
      onLoginFail={mockedOnLoinFail}
    />
  );
};

describe("Login Component", () => {
  it("renders correctly with pincode circles", () => {
    render(<MockLogin />);
    const emptyCircles = screen.queryAllByTestId("circle-element");
    expect(emptyCircles.length).toBe(4);
  });

  it("renders correctly 11 keys in numeric keyboard", () => {
    render(<MockLogin />);
    const keys = screen.queryAllByTestId("key-element");
    expect(keys.length).toBe(11);
  });

  it("should not check authorization, when the pin code is not long enough", async () => {
    render(<MockLogin />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    await waitFor(() => {
      expect(checkAuthorization).not.toHaveBeenCalled();
    });
  });

  it("should send api request, when the pin code is long enough, but still incorrect", async () => {
    const mockFetch = jest.fn();
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ status: "Failed" }),
    });
    window.fetch = mockFetch;
    render(<MockLogin />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("2"));
    expect(window.fetch).toHaveBeenCalled();
  });

  it("should send api request, when the pin code is long enough and correct", async () => {
    const mockFetch = jest.fn();
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ status: "Authorized" }),
    });
    window.fetch = mockFetch;
    render(<MockLogin />);
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("4"));
    expect(window.fetch).toHaveBeenCalled();
  });
});
