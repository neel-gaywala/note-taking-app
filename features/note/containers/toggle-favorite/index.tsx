"use client";
import { Star } from "lucide-react";
import React from "react";
import { useRedux } from "@/hooks";
import { TNote } from "@/lib/types";
import { toggleFavorite } from "@/redux-store/app";

type ToggleFavoriteProps = {
  note: TNote;
};

function ToggleFavorite({ note }: ToggleFavoriteProps) {
  const {
    dispatch,
    app: { favoriteNotes },
  } = useRedux();

  const isFavorite = favoriteNotes?.some((n) => n.id === note.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(note));
  };

  return (
    <div
      data-testid="toggle-favorite"
      className="flex space-x-2 p-1"
      onClick={handleToggle}
    >
      <Star
        fill={isFavorite ? "#fd9a00" : "none"}
        className="size-4 text-amber-500"
      />
    </div>
  );
}

export default ToggleFavorite;
