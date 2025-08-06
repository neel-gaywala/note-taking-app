import React from "react";
import { TNote } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { formatNow } from "@/lib/date-utils";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type NoteItemProps = {
  onEdit?: (item: TNote) => void;
} & TNote;

function NoteItem({ onEdit, ...rest }: NoteItemProps) {
  const { title, content, createdAt, id } = rest;

  return (
    <Link href={`/notes/${id}`} className="no-underline">
      <Card className="shadow-none  rounded-sm px-4 py-3 min-h-[160px] flex flex-col ">
        <div className="space-y-1 flex-1">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{content}</p>
        </div>
        <div className="flex justify-between items-center">
          <h6 className="text-xs text-gray-400">{formatNow(createdAt)}</h6>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (onEdit) {
                onEdit(rest);
              }
            }}
            className="size-8 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
          >
            <Pencil className=" size-3 text-white" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}

export default NoteItem;
