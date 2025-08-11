import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ToggleFavorite from "@/features/note/containers/toggle-favorite";
import { formatNow } from "@/lib/date-utils";
import { TNote } from "@/lib/types";
import { cn } from "@/lib/utils";

type NoteItemProps = {
  onEdit?: (item: TNote) => void;
  onDelete?: (item: TNote) => void;
} & TNote;

function NoteItem({ onEdit, onDelete, ...note }: NoteItemProps) {
  const { title, content, updatedAt, id } = note;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit?.(note);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete?.(note);
  };

  return (
    <Link href={`/note/${id}`} className="no-underline">
      <Card className="flex flex-col px-4 py-3 rounded-sm shadow-none sm:min-h-[140px]">
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="flex-1 text-lg font-semibold capitalize line-clamp-1">
              {title}
            </h3>
            <ToggleFavorite note={note} />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{content}</p>
        </div>

        <div className="flex items-center justify-between">
          <h6 className="text-xs text-gray-400">{formatNow(updatedAt)}</h6>
          <div className="flex">
            <Button
              className={cn("size-7 rounded-sm p-2")}
              variant="ghost"
              onClick={handleEdit}
            >
              <Pencil className="size-4 sm:size-3" />
            </Button>
            <Button
              className={cn("size-7 rounded-sm p-2")}
              variant="ghost"
              onClick={handleDelete}
            >
              <Trash className="size-4 sm:size-3" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default NoteItem;
