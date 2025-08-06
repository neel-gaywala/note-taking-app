"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sort: "newest" | "oldest";
  onSortChange: (value: "newest" | "oldest") => void;
};

function NoteFilter({ search, onSearchChange, sort, onSortChange }: Props) {
  const [input, setInput] = useState(search);

  const debouncedSearch = useDebounce(input, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Input
        placeholder="Search notes..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        className="w-full sm:w-[320px]"
      />

      <Select
        value={sort}
        onValueChange={(val) => onSortChange(val as "newest" | "oldest")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default NoteFilter;
