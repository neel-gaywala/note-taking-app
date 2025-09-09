import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/notes - Fetch all notes
export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

// POST /api/notes - Create a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
