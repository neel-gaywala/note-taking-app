import React from "react";
import { TNote } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatNow } from "@/lib/date-utils";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type NoteItemProps = {
  onEdit?: (item: TNote) => void;
  onDelete?: (item: TNote) => void;
} & TNote;

function NoteItem({ onEdit, onDelete, ...rest }: NoteItemProps) {
  const { title, content, updatedAt, id } = rest;

  return (
    <Link href={`/note/${id}`} className="no-underline">
      <Card className="shadow-none  rounded-sm px-4 py-3 sm:min-h-[140px] flex flex-col ">
        <div className="space-y-1 flex-1">
          <h3 className="text-lg font-semibold line-clamp-1 capitalize">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{content}</p>
        </div>
        <div className="flex justify-between items-center">
          <h6 className="text-xs text-gray-400">{formatNow(updatedAt)}</h6>
          <div className="flex space-x-2 sm:space-x-1">
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (onEdit) {
                  onEdit(rest);
                }
              }}
              className="size-8 sm:size-6 bg-black/70 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
            >
              <Pencil className="size-[10px] text-white" />
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (onDelete) {
                  onDelete(rest);
                }
              }}
              className="size-8 sm:size-6 bg-red-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors"
            >
              <Trash className="size-[10px] text-white" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default NoteItem;
