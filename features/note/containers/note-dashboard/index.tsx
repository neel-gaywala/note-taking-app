"use client";

import { TimelineChart } from "@/features/note/components/time-line-chart";
import { ContentLengthChart } from "@/features/note/components/content-length-chart";
import { ActivityChart } from "@/features/note/components/activity-chart";
import { StatusChart } from "@/features/note/components/status-chart";
import { SummaryStats } from "@/features/note/components/summary-chart";
import { TNote } from "@/lib/types";

const chartConfig = {
  count: {
    label: "Notes Created",
    color: "hsl(var(--chart-1))",
  },
  contentLength: {
    label: "Content Length",
    color: "hsl(var(--chart-2))",
  },
  created: {
    label: "Created",
    color: "hsl(var(--chart-3))",
  },
  updated: {
    label: "Updated",
    color: "hsl(var(--chart-4))",
  },
};

type NoteDashboardProps = {
  notesData: TNote[];
};
export default function NoteDashboard({ notesData }: NoteDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SummaryStats data={notesData} />

        <div className="grid gap-6 md:grid-cols-2">
          <TimelineChart data={notesData} />
          <ContentLengthChart data={notesData} />
          <ActivityChart data={notesData} />
          <StatusChart data={notesData} />
        </div>
      </div>
    </div>
  );
}
