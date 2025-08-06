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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TimelineChartProps {
  data: Note[];
}

const processTimelineData = (notesData: Note[]) => {
  const hourlyData = new Map();

  notesData.forEach((note) => {
    const hour = new Date(note.createdAt).getHours();
    const key = `${hour}:00`;
    hourlyData.set(key, (hourlyData.get(key) || 0) + 1);
  });

  return Array.from(hourlyData.entries())
    .map(([time, count]) => ({ time, count }))
    .sort((a, b) => parseInt(a.time) - parseInt(b.time));
};

const chartConfig = {
  count: {
    label: "Notes Created",
    color: "hsl(var(--chart-1))",
  },
};

export function TimelineChart({ data }: TimelineChartProps) {
  const timelineData = processTimelineData(data);

  return (
    <Card className="w-[368px] sm:w-full">
      <CardHeader>
        <CardTitle>Notes Created by Hour</CardTitle>
        <CardDescription>
          Distribution of note creation times throughout the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timelineData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                fontSize={12}
                tickMargin={5}
                axisLine={false}
              />
              <YAxis fontSize={12} tickMargin={5} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--color-count)"
                strokeWidth={2}
                dot={{ fill: "var(--color-count)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
