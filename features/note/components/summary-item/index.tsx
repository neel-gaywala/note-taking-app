import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryItemProps = {
  heading: string;
  content: number;
};

function SummaryItem({ heading, content }: SummaryItemProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{content}</div>
      </CardContent>
    </Card>
  );
}

export default SummaryItem;
