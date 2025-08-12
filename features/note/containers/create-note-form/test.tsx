import { UseMutationResult } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { useCreateNote } from "@/features/note/api";
import { useInvalidateQueries } from "@/hooks";
import { CreateNoteSchemaType } from "@/lib/types";
import CreateNoteForm from "../create-note-form";

jest.mock("@/features/note/api", () => ({
  useCreateNote: jest.fn(),
}));

jest.mock("@/hooks", () => ({
  useInvalidateQueries: jest.fn(),
}));

jest.mock("@/components/ui/sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/lib/validations", () => ({
  createNoteSchema: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
  }),
}));

const mockedUseCreateNote = jest.mocked(useCreateNote);
const mockedUseInvalidateQueries = jest.mocked(useInvalidateQueries);

const mockIdleMutationResult: Partial<
  UseMutationResult<any, Error, CreateNoteSchemaType>
> = {
  isIdle: true,
  isPending: false,
  isSuccess: false,
  isError: false,
  data: undefined,
  error: null,
};

const mockPendingMutationResult: Partial<
  UseMutationResult<any, Error, CreateNoteSchemaType>
> = {
  isIdle: false,
  isPending: true,
  isSuccess: false,
  isError: false,
  data: undefined,
  error: null,
};

describe("CreateNoteForm Component", () => {
  let mockCreateNoteMutate: jest.Mock;
  let mockInvalidateQueries: jest.Mock;
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateNoteMutate = jest.fn();
    mockInvalidateQueries = jest.fn();

    mockedUseCreateNote.mockReturnValue({
      ...mockIdleMutationResult,
      mutate: mockCreateNoteMutate,
    } as UseMutationResult<any, Error, CreateNoteSchemaType>);

    mockedUseInvalidateQueries.mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
      invalidateAllQueries: jest.fn(),
    });
  });

  test("should render empty fields and a create button", () => {
    render(<CreateNoteForm />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  test("should show validation errors for empty required fields", async () => {
    render(<CreateNoteForm />);
    await user.click(screen.getByRole("button", { name: /create/i }));

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
    expect(await screen.findByText("Content is required")).toBeInTheDocument();
    expect(mockCreateNoteMutate).not.toHaveBeenCalled();
  });

  test("should display loading state on button when submitting", () => {
    mockedUseCreateNote.mockReturnValue({
      ...mockPendingMutationResult,
      mutate: mockCreateNoteMutate,
    } as UseMutationResult<any, Error, CreateNoteSchemaType>);

    render(<CreateNoteForm />);
    expect(screen.getByRole("button", { name: /create/i })).toBeDisabled();
  });

  test("should call mutation with form data on valid submission", async () => {
    render(<CreateNoteForm />);

    await user.type(screen.getByLabelText("Title"), "My Test Note");
    await user.type(screen.getByLabelText("Content"), "Some test content.");
    await user.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(mockCreateNoteMutate).toHaveBeenCalledTimes(1);
      expect(mockCreateNoteMutate).toHaveBeenCalledWith(
        { title: "My Test Note", content: "Some test content." },
        expect.any(Object)
      );
    });
  });

  test("should handle successful submission and call callbacks", async () => {
    const onSuccessProp = jest.fn();
    mockCreateNoteMutate.mockImplementation((_note, options) => {
      options.onSuccess?.();
    });

    render(<CreateNoteForm onSuccess={onSuccessProp} />);

    await user.type(screen.getByLabelText("Title"), "A successful note");
    await user.type(screen.getByLabelText("Content"), "This works!");
    await user.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Note created successfully");
      expect(mockInvalidateQueries).toHaveBeenCalledWith(["notes"]);
      expect(onSuccessProp).toHaveBeenCalledTimes(1);
    });
  });

  test("should handle failed submission and call callbacks", async () => {
    const onErrorProp = jest.fn();
    mockCreateNoteMutate.mockImplementation((_note, options) => {
      options.onError?.();
    });

    render(<CreateNoteForm onError={onErrorProp} />);

    await user.type(screen.getByLabelText("Title"), "A failed note");
    await user.type(screen.getByLabelText("Content"), "This will not work.");
    await user.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to create note");
      expect(onErrorProp).toHaveBeenCalledTimes(1);
      expect(mockInvalidateQueries).not.toHaveBeenCalled();
    });
  });
});
