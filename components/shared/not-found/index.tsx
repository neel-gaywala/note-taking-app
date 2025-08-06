import { Telescope } from "lucide-react";
import React from "react";

function NotFound() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center space-y-2">
      <Telescope />
      <div className="space-y-1 text-center">
        <h3 className="heading-6 text-gray-foreground">{"No Result Found"}</h3>
        <p className="paragraph-sm text-gray-foreground">
          {`We can't find any item matching your search`}
        </p>
      </div>
    </div>
  );
}

export { NotFound };
