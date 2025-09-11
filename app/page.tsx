import Navigation from "@/components/Navigation";
import NotesList from "@/components/NotesList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        <NotesList />
      </main>
    </div>
  );
}
