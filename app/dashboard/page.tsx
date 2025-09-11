import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Dashboard - Note Taking App",
  description: "Dashboard overview of your note-taking activity",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        <Dashboard />
      </main>
    </div>
  );
}