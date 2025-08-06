"use client";

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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ContentLengthChartProps {
  data: Note[];
}

const processContentLengthData = (notesData: Note[]) => {
  return notesData
    .map((note) => ({
      id: note.id,
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
};

export function ContentLengthChart({ data }: ContentLengthChartProps) {
  const contentLengthData = processContentLengthData(data);

  return (
    <Card className="w-[368px] sm:w-full">
      <CardHeader>
        <CardTitle>Content Length by Note</CardTitle>
        <CardDescription>
          Character count for each note's content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={contentLengthData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="title" type="category" width={80} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="contentLength" fill="var(--color-contentLength)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
