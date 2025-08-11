"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
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
import type { TNote } from "@/lib/types";

interface ContentLengthChartProps {
  data: TNote[];
}

type Processed = {
  id: string;
  title: string;
  contentLength: number;
  titleLength: number;
};

const processContentLengthData = (notesData: TNote[]): Processed[] => {
  return notesData
    .map((note) => ({
      id: String(note.id),
      title:
        note.title.length > 10
          ? note.title.substring(0, 10) + "..."
          : note.title,
      contentLength: note.content.length,
      titleLength: note.title.length,
    }))
    .sort((a, b) => b.contentLength - a.contentLength);
};

const chartConfig = {
  contentLength: {
    label: "Content Length",
    color: "hsl(var(--chart-2))",
  },
} as const;

export function ContentLengthChart({ data }: ContentLengthChartProps) {
  const contentLengthData = processContentLengthData(data);

  return (
    <Card className="max-w-full overflow-hidden">
      <CardHeader>
        <CardTitle>{"Content Length by Note"}</CardTitle>
        <CardDescription>
          {"Character count for each note content"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[360px]">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contentLengthData}
                  layout="vertical"
                  margin={{ left: 8, right: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="title"
                    type="category"
                    width={100}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursor={false}
                  />
                  <Bar
                    dataKey="contentLength"
                    name="Content Length"
                    fill="var(--color-contentLength)"
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContentLengthChart;
