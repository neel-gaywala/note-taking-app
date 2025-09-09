import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateNote, useUpdateNote } from "@/hooks/useNotes";
import { Note, CreateNoteRequest } from "@/types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";

interface NoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  note?: Note | null;
}

const NoteForm: React.FC<NoteFormProps> = ({ isOpen, onClose, note }) => {
  const isEditing = !!note;
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteRequest>({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (isOpen && note) {
      reset({
        title: note.title,
        content: note.content,
      });
    } else if (isOpen && !note) {
      reset({
        title: "",
        content: "",
      });
    }
  }, [isOpen, note, reset]);

  const onSubmit = async (data: CreateNoteRequest) => {
    try {
      if (isEditing && note) {
        await updateNote.mutateAsync({
          id: note.id,
          data,
        });
      } else {
        await createNote.mutateAsync(data);
      }
      onClose();
      reset();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Note" : "Create New Note"}
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Title"
          {...register("title", {
            required: "Title is required",
            maxLength: {
              value: 100,
              message: "Title must be less than 100 characters",
            },
          })}
          error={errors.title?.message}
          placeholder="Enter note title..."
          autoFocus
        />

        <Textarea
          label="Content"
          {...register("content", {
            required: "Content is required",
            maxLength: {
              value: 5000,
              message: "Content must be less than 5000 characters",
            },
          })}
          error={errors.content?.message}
          placeholder="Write your note content..."
          rows={8}
        />

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {"Cancel"}
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isEditing ? "Update Note" : "Create Note"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NoteForm;
