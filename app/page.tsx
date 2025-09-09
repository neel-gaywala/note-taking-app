'use client';

import { useState } from 'react';
import { ViewMode } from '@/types';
import Navigation from '@/components/Navigation';
import NotesList from '@/components/NotesList';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('list');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="min-h-[calc(100vh-4rem)]">
        {currentView === 'list' ? <NotesList /> : <Dashboard />}
      </main>
    </div>
  );
}
