"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";
import NotesList from "@/components/NotesList";
import { ViewMode } from "@/types";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>("list");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="min-h-[calc(100vh-4rem)]">
        {currentView === "list" ? <NotesList /> : <Dashboard />}
      </main>
    </div>
  );
}
