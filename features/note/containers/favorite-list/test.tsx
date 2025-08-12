import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

import { useRedux } from "@/hooks";
import {
  MOCK_NOTE_DATA,
  mockDefaultAppState,
  MOCK_FAV_DATA,
} from "@/lib/mock-data";
import { TNote } from "@/lib/types";
import type { AppSliceStateProps } from "@/redux-store/app/interfaces";
import FavoriteList from "../favorite-list";

jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel">{children}</div>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="carousel-item">{children}</div>
  ),
}));

jest.mock("@/features/note/components/favorite-item", () => {
  function MockFavoriteItem({ title }: { title: string }) {
    return <div data-testid="favorite-item">{title}</div>;
  }
  MockFavoriteItem.displayName = "MockFavoriteItem";
  return MockFavoriteItem;
});

jest.mock("@/hooks", () => ({
  useRedux: jest.fn(),
}));

const mockedUseRedux = jest.mocked(useRedux);

describe("FavoriteList UI Rendering", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = (
    notes: Partial<AppSliceStateProps> = {},
    initialNotes: TNote[] = MOCK_NOTE_DATA
  ) => {
    mockedUseRedux.mockReturnValue({
      app: {
        ...mockDefaultAppState,
        ...notes,
      },
      dispatch: jest.fn(),
    });
    return render(<FavoriteList initialNotes={initialNotes} />);
  };

  it("should render nothing if there are no favorite notes", () => {
    const { container } = setup();
    expect(container.firstChild).toBeNull();
  });

  it("should render nothing if the initialNotes prop is empty", () => {
    const { container } = setup({ favoriteNotes: MOCK_FAV_DATA }, []);
    expect(container.firstChild).toBeNull();
  });

  it("should render correctly when favorites exist", () => {
    setup({ favoriteNotes: MOCK_FAV_DATA });

    expect(
      screen.getByRole("heading", { name: /favorite/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByText("Favorite Note 1")).toBeInTheDocument();
  });

  it("should filter and display only notes marked as favorite", () => {
    setup({ favoriteNotes: MOCK_FAV_DATA });

    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    const favoriteItems = screen.getAllByTestId("favorite-item");
    expect(favoriteItems).toHaveLength(2);

    expect(screen.getByText("Favorite Note 1")).toBeInTheDocument();
    expect(screen.getByText("Favorite Note 3")).toBeInTheDocument();
    expect(screen.queryByText("Regular Note 2")).not.toBeInTheDocument();
  });
});
