import { startOfWeek, isAfter } from "date-fns";
import { useMemo } from "react";
import { Note, NotesStats, ChartDataPoint } from "@/types";
import { useNotes } from "./useNotes";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
  "i",
  "you",
  "we",
  "they",
  "this",
  "but",
  "or",
  "not",
]);

const extractWords = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
};

const getMostFrequentWord = (notes: Note[]): string => {
  const wordCounts: Record<string, number> = {};

  notes.forEach((note) => {
    const words = [...extractWords(note.title), ...extractWords(note.content)];

    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  });

  const entries = Object.entries(wordCounts);
  if (entries.length === 0) return "N/A";

  return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
};

const getLongestNote = (notes: Note[]): Note | null => {
  if (notes.length === 0) return null;

  return notes.reduce((longest, current) =>
    current.content.length > longest.content.length ? current : longest,
  );
};

const getNotesThisWeek = (notes: Note[]): number => {
  const startOfThisWeek = startOfWeek(new Date());

  return notes.filter((note) =>
    isAfter(new Date(note.createdAt), startOfThisWeek),
  ).length;
};

const getChartData = (notes: Note[]): ChartDataPoint[] => {
  const dateGroups: Record<string, number> = {};

  notes.forEach((note) => {
    const date = new Date(note.createdAt).toISOString().split("T")[0];
    dateGroups[date] = (dateGroups[date] || 0) + 1;
  });

  return Object.entries(dateGroups)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14);
};

export const useNotesStats = () => {
  const { data: notes = [], isLoading, error } = useNotes();

  const stats = useMemo(
    (): NotesStats => ({
      totalNotes: notes.length,
      notesThisWeek: getNotesThisWeek(notes),
      mostFrequentWord: getMostFrequentWord(notes),
      longestNote: getLongestNote(notes),
    }),
    [notes],
  );

  const chartData = useMemo(
    (): ChartDataPoint[] => getChartData(notes),
    [notes],
  );

  return {
    stats,
    chartData,
    isLoading,
    error,
  };
};
