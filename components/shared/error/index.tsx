import React from "react"
import Link from "next/link"

type ErrorProps = {
  message?: string
  redirect?: string
}

function Error({ message, redirect = "/" }: ErrorProps) {
  return (
    <div className="screen-container flex min-h-96 flex-col items-center justify-center">
      <div className="space-y-5 text-center">
        <h1 className="display-xl text-gray-foreground text-7xl tracking-wider">
          400
        </h1>
        <div className="space-y-4">
          <div className="space-y-1 text-center">
            <h3 className="heading-6 text-gray-foreground">Page not found</h3>
            <p className="paragraph-base text-gray-foreground max-w-md">
              {message ??
                `The page you are looking for doesn't exist or an other error occurred`}
            </p>
          </div>
          <Link replace href={redirect}>
            Return Page
          </Link>
        </div>
      </div>
    </div>
  )
}

export { Error }
