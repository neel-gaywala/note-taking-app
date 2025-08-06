"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks";
import { ArrowLeft } from "lucide-react";
type BackProps = {
  children?: React.ReactNode;
  heading?: string;
};

function Back({ children, heading }: BackProps) {
  const { back } = useNavigation();
  return (
    <Button
      // className="m-0 p-0 text-muted-foreground"
      variant={"link"}
      onClick={() => {
        back();
      }}
    >
      <>
        <ArrowLeft />
        {!heading && (children || "Back")}
      </>
    </Button>
  );
}

export { Back };
