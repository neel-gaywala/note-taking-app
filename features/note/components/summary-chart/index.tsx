"use client";
import SummaryItem from "../summary-item";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface SummaryStatsProps {
  data: Note[];
}

export function SummaryStats({ data }: SummaryStatsProps) {
  const editedNotesCount = data.filter(
    (note) => note.createdAt !== note.updatedAt
  ).length;
  const avgContentLength = Math.round(
    data.reduce((acc, note) => acc + note.content.length, 0) / data.length
  );

  // Calculate most active hour
  const hourlyData = new Map();
  data.forEach((note) => {
    const hour = new Date(note.createdAt).getHours();
    const key = `${hour}:00`;
    hourlyData.set(key, (hourlyData.get(key) || 0) + 1);
  });

  const mostActiveHour = Array.from(hourlyData.entries()).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["N/A", 0]
  )[0];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <SummaryItem heading={"Total Notes"} content={data.length} />
      <SummaryItem heading={"Edited Notes"} content={editedNotesCount} />
      <SummaryItem heading={"Avg Content Length"} content={avgContentLength} />
      <SummaryItem heading={"Most Active Hour"} content={mostActiveHour} />
    </div>
  );
}
