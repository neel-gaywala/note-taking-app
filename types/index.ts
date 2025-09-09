export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
}

export interface UpdateNoteRequest {
  title: string;
  content: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

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

export type ViewMode = 'list' | 'dashboard';