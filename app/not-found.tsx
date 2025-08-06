import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="screen-container flex min-h-screen items-center justify-center">
      <div className="space-y-5 text-center">
        <h1 className="display-xl text-gray-foreground text-7xl tracking-wider">
          {"404"}
        </h1>
        <div className="space-y-4">
          <div className="space-y-1 text-center">
            <h3 className="heading-6 text-gray-foreground">
              {"Page not found"}
            </h3>
            <p className="paragraph-sm text-gray-foreground max-w-sm">
              {`The page you are looking for doesn't exist or an other error occurred`}
            </p>
          </div>

          <Link replace href="/">
            {"Return Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
