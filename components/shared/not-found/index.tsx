import React from "react"
import Image from "next/image"

import { noResults } from "@/assets/icons"

function NotFound() {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center space-y-2">
      <Image
        src={noResults}
        alt="No Results found"
        width={120}
        height={120}
        sizes="(max-width: 768px) 120px, 120px"
      />
      <div className="space-y-1 text-center">
        <h3 className="heading-6 text-gray-foreground">No Result Found</h3>
        <p className="paragraph-sm text-gray-foreground">
          {`We can't find any item matching your search`}
        </p>
      </div>
    </div>
  )
}

export { NotFound }
