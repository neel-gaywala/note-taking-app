"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useRedux, useDebounce } from "@/hooks";
import { DATE_FILTER_DATA, SORT_FILTER_DATA } from "@/lib/constants";
import { setFilterBy } from "@/redux-store/app";

function NoteFilter() {
  const {
    app: { filterBy },
    dispatch,
  } = useRedux();

  const { search, date, sort } = filterBy ?? {};
  const [localSearch, setLocalSearch] = useState(search ?? "");

  const debouncedSearch = useDebounce(localSearch, 300);

  const updateFilter = (key: string, value: string) => {
    dispatch(
      setFilterBy({
        ...filterBy,
        [key]: value,
      })
    );
  };

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateFilter("search", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between">
      <div className="flex gap-3">
        <Input
          placeholder="Search ..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full sm:w-[300px]"
        />
        <Select
          value={sort}
          onValueChange={(value) => updateFilter("sort", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_FILTER_DATA.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ToggleGroup
        type="single"
        value={date}
        variant="outline"
        onValueChange={(value) => updateFilter("date", value)}
      >
        {DATE_FILTER_DATA.map((item) => (
          <ToggleGroupItem key={item.id} value={item.value} className="px-4">
            {item.item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default NoteFilter;
