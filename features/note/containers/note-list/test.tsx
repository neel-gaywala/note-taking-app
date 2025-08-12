import "@testing-library/jest-dom";
import { DefinedUseQueryResult } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";

import { useGetNotes } from "@/features/note/api";
import { useRedux } from "@/hooks";
import { MOCK_NOTE_DATA, mockDefaultAppState } from "@/lib/mock-data";
import { TNote } from "@/lib/types";
import NoteList from "../note-list";

jest.mock("@/features/note/api", () => ({
  useGetNotes: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useRedux: jest.fn(),
  useInvalidateQueries: () => ({ invalidateQueries: jest.fn() }),
}));

jest.mock("@/features/note/components/note-item", () => ({
  __esModule: true,
  default: jest.fn(({ title }) => <li data-testid="note-item">{title}</li>),
}));

jest.mock("@/components/shared/not-found", () => ({
  NotFound: () => <div>{"Not Found"}</div>,
}));

jest.mock("@/features/note/api", () => ({
  useGetNotes: jest.fn(),
  useDeleteNote: jest.fn(() => ({ mutate: jest.fn() })),
}));

const mockedUseGetNotes = jest.mocked(useGetNotes);
const mockedUseRedux = jest.mocked(useRedux);

const mockDefinedSuccessQueryResult: Partial<
  DefinedUseQueryResult<TNote[], Error>
> = {
  status: "success",
  isError: false,
  isSuccess: true,
  isLoading: false,
  isPending: false,
  isFetching: false,
  isStale: false,
  error: null,
  refetch: jest.fn(),
};

describe("NoteList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseGetNotes.mockImplementation(
      ({ initialNotes }) =>
        ({
          ...mockDefinedSuccessQueryResult,
          data: initialNotes,
        }) as DefinedUseQueryResult<TNote[], Error>
    );

    mockedUseRedux.mockReturnValue({
      app: mockDefaultAppState,
      dispatch: jest.fn(),
    });
  });

  test("should render a list of notes from props", () => {
    render(<NoteList initialNotes={MOCK_NOTE_DATA} />);

    const items = screen.getAllByTestId("note-item");
    expect(items).toHaveLength(3);
    expect(screen.getByText("Favorite Note 1")).toBeInTheDocument();
  });

  test("should render NotFound component when no notes match filters", () => {
    mockedUseRedux.mockReturnValue({
      app: {
        ...mockDefaultAppState,
        filterBy: { ...mockDefaultAppState.filterBy, search: "nonexistent" },
      },
      dispatch: jest.fn(),
    });

    render(<NoteList initialNotes={MOCK_NOTE_DATA} />);

    expect(screen.getByText("Not Found")).toBeInTheDocument();
    expect(screen.queryByTestId("note-item")).not.toBeInTheDocument();
  });
});
