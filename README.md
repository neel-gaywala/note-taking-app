# Note Taking App

A simple Next.js application with a REST API for managing notes using SQLite database and Prisma ORM.

## Features

- ✅ Create, read, update, and delete notes
- ✅ SQLite database with Prisma ORM
- ✅ RESTful API endpoints
- ✅ TypeScript support
- ✅ Simple test interface

## Database Schema

Each note contains:

- `id` (auto-increment primary key)
- `title` (string)
- `content` (string)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd note-taking-app
```

2. Install dependencies:

```bash
npm install
```

3. **IMPORTANT: Set up the database BEFORE using any API endpoints**

   a. Generate Prisma client:

   ```bash
   npm run db:generate
   ```

   b. Create and migrate the database:

   ```bash
   npm run db:migrate
   ```

   This will:
   - Create the SQLite database file (`prisma/dev.db`)
   - Run the initial migration to create the `Note` table
   - Generate the Prisma client for database operations

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### ⚠️ Database Setup Required

**You MUST complete step 3 above before making any API calls.** Without running the database migration, you'll get errors when trying to use the API endpoints because the database and tables won't exist.

## API Endpoints

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | `/api/notes`      | Fetch all notes     |
| GET    | `/api/notes/{id}` | Fetch a single note |
| POST   | `/api/notes`      | Create a new note   |
| PUT    | `/api/notes/{id}` | Update a note       |
| DELETE | `/api/notes/{id}` | Delete a note       |

## Tech Stack

- **Framework**: Next.js 15.4.4
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Hooks**: Use Context Hooks
- **API**: Use react-query for API Integration

## Project Structure

```
├── app/
│   ├── api/notes/           # API routes│
│   └── ...                  # Next.js app directory
├── lib/
│   └── db.ts               # Database connection
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── dev.db             # SQLite database (created after migration)
└── ...
```

## Environment Variables

The `.env` file is already configured with:

```env
DATABASE_URL="file:./dev.db"
```

## Note Schema Example

```json
{
  "id": 1,
  "title": "Note Title",
  "content": "Note content",
  "createdAt": "2025-07-28T11:25:31.000Z",
  "updatedAt": "2025-07-28T11:25:31.000Z"
}
```

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request` - Invalid input data
- `404 Not Found` - Note not found
- `500 Internal Server Error` - Server error

Example error response:

```json
{
  "error": "Note not found"
}
```

## Troubleshooting

### "Table 'Note' doesn't exist" error

Run the database migration: `npm run db:migrate`

### "PrismaClient is unable to run in this browser environment"

Make sure you're making API calls to the server endpoints (`/api/notes`), not trying to use Prisma directly in the browser.

### Database file permissions

Ensure the `prisma/` directory has write permissions for creating the SQLite database file.
