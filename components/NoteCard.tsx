import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { Note } from "@/types";
import Button from "./ui/Button";
import Card from "./ui/Card";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const previewLength = 120;
  const preview =
    note.content.length > previewLength
      ? note.content.substring(0, previewLength) + "..."
      : note.content;

  return (
    <Card className="p-4 h-full flex flex-col" hover>
      <div className="flex-1 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 flex-1">{preview}</p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {format(new Date(note.updatedAt), "MMM d, yyyy")}
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-1.5 hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-1.5 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NoteCard;
