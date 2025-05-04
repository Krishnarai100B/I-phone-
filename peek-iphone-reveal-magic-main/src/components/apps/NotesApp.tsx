
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";

interface NotesAppProps {
  notes: string[];
  newNote: string;
  setNewNote: (note: string) => void;
  addNote: (note: string) => void;
}

const NotesApp: React.FC<NotesAppProps> = ({
  notes,
  newNote,
  setNewNote,
  addNote
}) => {
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addNote(newNote);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleAddNote} className="mb-4">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          className="w-full p-3 border rounded-lg resize-none h-24"
        />
        <button 
          type="submit"
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Add Note
        </button>
      </form>
      
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center text-gray-400 p-6">
            No notes yet. Add your first note!
          </div>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="whitespace-pre-wrap break-words">{note}</p>
              <div className="text-xs text-gray-400 mt-2">
                Note {index + 1} • {new Date().toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesApp;
