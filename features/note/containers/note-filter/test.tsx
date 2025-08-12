import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { useRedux } from "@/hooks";
import { mockDefaultAppState } from "@/lib/mock-data";
import { setFilterBy } from "@/redux-store/app";
import NoteFilter from "../note-filter";

jest.mock("@/components/ui/select", () => ({
  Select: ({ onValueChange, value, children }: any) => (
    // eslint-disable-next-line react/forbid-elements
    <select
      data-testid="sort-select"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: any) => (
    <React.Fragment>{children}</React.Fragment>
  ),
  SelectValue: ({ placeholder }: any) => placeholder,
  SelectContent: ({ children }: any) => (
    <React.Fragment>{children}</React.Fragment>
  ),
  SelectItem: ({ value, children }: any) => (
    <option value={value}>{children}</option>
  ),
}));

jest.mock("@/hooks", () => ({
  useRedux: jest.fn(),
  useDebounce: jest.requireActual("@/hooks").useDebounce,
}));

jest.mock("@/redux-store/app", () => ({
  setFilterBy: jest.fn(),
}));

const mockedUseRedux = jest.mocked(useRedux);
const mockedSetFilterBy = jest.mocked(setFilterBy);

describe("NoteFilter Component", () => {
  let mockDispatch: jest.Mock;
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockedUseRedux.mockReturnValue({
      app: mockDefaultAppState,
      dispatch: mockDispatch,
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should dispatch setFilterBy when the sort option is changed", async () => {
    render(<NoteFilter />);

    const sortSelect = screen.getByTestId("sort-select");

    await user.selectOptions(sortSelect, "Title: Z-A");

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockedSetFilterBy).toHaveBeenCalledWith({
      ...mockDefaultAppState.filterBy,
      sort: "desc",
    });
  });

  test("should render all controls with default values", () => {
    render(<NoteFilter />);

    expect(screen.getByPlaceholderText("Search ...")).toHaveValue("");
    expect(screen.getByTestId("sort-select")).toHaveValue("newest");
  });
});
