"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TNote } from "@/lib/types";

interface StatusChartProps {
  data: TNote[];
}

const processStatusData = (notesData: TNote[]) => {
  const edited = notesData.filter(
    (note) => note.createdAt !== note.updatedAt
  ).length;
  const unedited = notesData.length - edited;

  return [
    { name: "Edited", value: edited, fill: "#8884d8" },
    { name: "Unedited", value: unedited, fill: "#82ca9d" },
  ];
};

const chartConfig = {
  value: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
};

export function StatusChart({ data }: StatusChartProps) {
  const statusData = processStatusData(data);

  return (
    <Card className="max-w-full overflow-hidden">
      <CardHeader>
        <CardTitle>{"Note Status"}</CardTitle>
        <CardDescription>{"Edited vs unedited notes"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[320px] mx-auto">
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart width={300} height={300}>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
