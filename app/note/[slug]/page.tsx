import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import React from "react";

import { Back } from "@/components/shared/back";
import { Error } from "@/components/shared/error";
import { getFetchNotes, getFetchNoteDetails } from "@/features/note/api";
import { formatNow } from "@/lib/date-utils";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const notes = await getFetchNotes();
  return notes?.map(({ id }) => ({ id })) ?? [];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const note = await getFetchNoteDetails(slug);

  if (note) {
    const { title, content } = note;

    return {
      metadataBase: new URL("https://app.nammatvk.com"),
      title,
      description: content,
    };
  }

  return {
    title: "Page Not Found",
    description: "No blog post found for the given URL.",
  };
}

async function NoteDetails({ params }: Params) {
  const { slug } = await params;

  const noteDetails = await getFetchNoteDetails(slug);

  if (!noteDetails) {
    return <Error />;
  }

  const { content, title, createdAt } = noteDetails!;

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 min-h-screen w-full space-y-6 sm:space-y-12">
      <Back />
      <div className="px-4 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Calendar className="size-4" />
            <h6 className="text-xs text-gray-400">{formatNow(createdAt)}</h6>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </section>
  );
}

export default NoteDetails;
