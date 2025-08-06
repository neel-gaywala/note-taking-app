"use client";

import React from "react";

import { useNavigation } from "@/hooks";

type BackProps = {
  children?: React.ReactNode;
  heading?: string;
};

function Back({ children, heading }: BackProps) {
  const { back } = useNavigation();
  return (
    <div className="flex items-center gap-2">
      <div
        onClick={() => {
          back();
        }}
      >
        <>{!heading && (children || "Back")}</>
      </div>
      {heading && <h6 className="heading-6">{heading}</h6>}
    </div>
  );
}

export { Back };
