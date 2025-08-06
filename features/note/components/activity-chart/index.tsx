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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityChartProps {
  data: Note[];
}

const processActivityData = (notesData: Note[]) => {
  const activityMap = new Map();

  notesData.forEach((note) => {
    const createdHour = new Date(note.createdAt).getHours();
    const updatedHour = new Date(note.updatedAt).getHours();

    const createdKey = `${createdHour}:00`;
    const updatedKey = `${updatedHour}:00`;

    if (!activityMap.has(createdKey)) {
      activityMap.set(createdKey, { time: createdKey, created: 0, updated: 0 });
    }
    if (!activityMap.has(updatedKey)) {
      activityMap.set(updatedKey, { time: updatedKey, created: 0, updated: 0 });
    }

    activityMap.get(createdKey).created += 1;
    if (note.createdAt !== note.updatedAt) {
      activityMap.get(updatedKey).updated += 1;
    }
  });

  return Array.from(activityMap.values()).sort(
    (a, b) => parseInt(a.time) - parseInt(b.time)
  );
};

const chartConfig = {
  created: {
    label: "Created",
    color: "hsl(var(--chart-3))",
  },
  updated: {
    label: "Updated",
    color: "hsl(var(--chart-4))",
  },
};

export function ActivityChart({ data }: ActivityChartProps) {
  const activityData = processActivityData(data);

  return (
    <Card className="w-[368px] sm:w-full">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>Notes created vs updated by hour</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="created"
              stackId="1"
              stroke="var(--color-created)"
              fill="var(--color-created)"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="updated"
              stackId="1"
              stroke="var(--color-updated)"
              fill="var(--color-updated)"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
