import { Note } from './note';

export interface NotesStats {
  totalNotes: number;
  notesThisWeek: number;
  mostFrequentWord: string;
  longestNote: Note | null;
}

export interface ChartDataPoint {
  date: string;
  count: number;
}