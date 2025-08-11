"use client";
import React from "react";
import { ActivityChart } from "@/features/note/containers/activity-chart";
import { ContentLengthChart } from "@/features/note/containers/content-length-chart";
import { StatusChart } from "@/features/note/containers/status-chart";
import { SummaryStats } from "@/features/note/containers/summary-chart";
import { TimelineChart } from "@/features/note/containers/time-line-chart";
import { TNote } from "@/lib/types";

type NoteDashboardProps = {
  notesData: TNote[];
};

export default function NoteDashboard({ notesData }: NoteDashboardProps) {
  return (
    <div className="space-y-5">
      <SummaryStats data={notesData} />
      <div className="grid gap-5 md:grid-cols-2">
        <StatusChart data={notesData} />
        <TimelineChart data={notesData} />
        <ActivityChart data={notesData} />
        <ContentLengthChart data={notesData} />
      </div>
    </div>
  );
}
