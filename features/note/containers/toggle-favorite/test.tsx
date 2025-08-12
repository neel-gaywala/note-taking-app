import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { useRedux } from "@/hooks";
import { mockDefaultAppState, MOCK_NOTE_DATA } from "@/lib/mock-data";
import { TNote } from "@/lib/types";
import { toggleFavorite } from "@/redux-store/app";
import ToggleFavorite from "../toggle-favorite";

jest.mock("lucide-react", () => ({
  __esModule: true,
  Star: () => <span>{"Star Icon"}</span>,
}));

jest.mock("@/hooks", () => ({
  useRedux: jest.fn(),
}));

jest.mock("@/redux-store/app", () => ({
  toggleFavorite: jest.fn(),
}));

const mockedUseRedux = jest.mocked(useRedux);
const mockedToggleFavorite = jest.mocked(toggleFavorite);

const mockNote: TNote = MOCK_NOTE_DATA[0];

describe("ToggleFavorite Component ⭐", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockedUseRedux.mockReturnValue({
      dispatch: mockDispatch,
      app: mockDefaultAppState,
    });
  });

  test("should dispatch the toggleFavorite action when clicked", async () => {
    const user = userEvent.setup();
    render(<ToggleFavorite note={mockNote} />);

    await user.click(screen.getByTestId("toggle-favorite"));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockedToggleFavorite).toHaveBeenCalledWith(mockNote);
  });
});
