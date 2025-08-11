"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import FavoriteItem from "@/features/note/components/favorite-item";
import { useRedux } from "@/hooks";
import { TNote } from "@/lib/types";

type NoteListProps = {
  initialNotes: TNote[];
};

function FavoriteList({ initialNotes }: NoteListProps) {
  const { app } = useRedux();
  const { favoriteNotes } = app;

  const [api, setApi] = useState<CarouselApi>();

  const favoriteItems = useMemo(() => {
    return initialNotes.filter((note) =>
      favoriteNotes?.some((fav) => fav.id === note.id)
    );
  }, [initialNotes, favoriteNotes]);

  if (favoriteItems.length === 0) {
    return null;
  }

  return (
    <div className="relative flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="heading">{"Favorite"}</h3>
        <div className="flex space-x-2">
          <Button
            className="size-8"
            variant="outline"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft />
          </Button>
          <Button
            className="size-8"
            variant="outline"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-fit max-w-full overflow-hidden"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {favoriteItems.map((item) => (
            <CarouselItem
              key={item.id}
              className={
                favoriteItems.length === 1
                  ? "basis-xs"
                  : "basis-full sm:basis-1/2 lg:basis-1/4"
              }
            >
              <FavoriteItem {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default FavoriteList;
