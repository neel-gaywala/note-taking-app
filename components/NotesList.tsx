import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Note } from '@/types';
import { useNotes, useDeleteNote } from '@/hooks/useNotes';
import useDebounce from '@/hooks/useDebounce';
import Button from './ui/Button';
import Input from './ui/Input';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import DeleteConfirmModal from './DeleteConfirmModal';

const NotesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteNoteId, setDeleteNoteId] = useState<number | null>(null);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: notes = [], isLoading, error } = useNotes();
  const deleteNote = useDeleteNote();

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    note.content.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleDeleteNote = (id: number) => {
    setDeleteNoteId(id);
  };

  const confirmDelete = () => {
    if (deleteNoteId) {
      deleteNote.mutate(deleteNoteId);
      setDeleteNoteId(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading notes. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleCreateNote} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="flex space-x-2">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-16">
          {searchQuery ? (
            <div>
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matching notes</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <div>
              <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-500 mb-6">Create your first note to get started</p>
              <Button onClick={handleCreateNote} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Note</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}

      <NoteForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        note={editingNote}
      />

      <DeleteConfirmModal
        isOpen={deleteNoteId !== null}
        onClose={() => setDeleteNoteId(null)}
        onConfirm={confirmDelete}
        isLoading={deleteNote.isPending}
      />
    </div>
  );
};

export default NotesList;