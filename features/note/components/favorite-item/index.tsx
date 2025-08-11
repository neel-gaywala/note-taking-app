import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import ToggleFavorite from "@/features/note/containers/toggle-favorite";
import { formatNow } from "@/lib/date-utils";
import { TNote } from "@/lib/types";

function FavoriteItem(props: TNote) {
  const { title, content, updatedAt, id } = props;

  return (
    <Link href={`/note/${id}`} className="no-underline">
      <Card className="shadow-none  rounded-sm px-4 py-3 sm:min-h-[140px] flex flex-col ">
        <div className="space-y-1 flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold line-clamp-1 capitalize flex-1">
              {title}
            </h3>
            <ToggleFavorite note={props} />
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{content}</p>
        </div>
        <div className="flex justify-between items-center">
          <h6 className="text-xs text-gray-400">{formatNow(updatedAt)}</h6>
        </div>
      </Card>
    </Link>
  );
}

export default FavoriteItem;
