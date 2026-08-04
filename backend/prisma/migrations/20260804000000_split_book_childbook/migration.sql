-- Split `books` into shared metadata (books) + per-child reading state (child_books).
-- Data-preserving: existing per-child state is copied into child_books BEFORE the
-- old columns are dropped. reading_sessions.bookId keeps pointing at books.id.

-- 1. New per-child state table
CREATE TABLE "child_books" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'to-read',
    "currentPage" INTEGER,
    "startDate" TIMESTAMP(3),
    "finishDate" TIMESTAMP(3),
    "rating" INTEGER,
    "notes" TEXT,
    "favoriteCharacter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "child_books_pkey" PRIMARY KEY ("id")
);

-- 2. Add familyId to books (nullable during backfill)
ALTER TABLE "books" ADD COLUMN "familyId" TEXT;

-- 3. Backfill familyId from the child that currently owns each book
UPDATE "books" b SET "familyId" = c."familyId"
FROM "children" c
WHERE c."id" = b."childId";

-- 4. Copy per-child reading state into child_books (one row per existing book)
INSERT INTO "child_books" (
    "id", "bookId", "childId", "status", "currentPage", "startDate",
    "finishDate", "rating", "notes", "favoriteCharacter", "createdAt", "updatedAt"
)
SELECT
    gen_random_uuid()::text, "id", "childId", "status", "currentPage", "startDate",
    "finishDate", "rating", "notes", "favoriteCharacter", "createdAt", "updatedAt"
FROM "books";

-- 5. Enforce familyId NOT NULL now that it is backfilled
ALTER TABLE "books" ALTER COLUMN "familyId" SET NOT NULL;

-- 6. Drop the now-migrated per-child columns, indexes and FK from books
DROP INDEX "books_childId_idx";
DROP INDEX "books_childId_status_idx";
DROP INDEX "books_childId_genre_idx";
ALTER TABLE "books" DROP CONSTRAINT "books_childId_fkey";
ALTER TABLE "books"
    DROP COLUMN "childId",
    DROP COLUMN "status",
    DROP COLUMN "currentPage",
    DROP COLUMN "startDate",
    DROP COLUMN "finishDate",
    DROP COLUMN "rating",
    DROP COLUMN "notes",
    DROP COLUMN "favoriteCharacter";

-- 7. New indexes
CREATE INDEX "books_familyId_idx" ON "books"("familyId");
CREATE UNIQUE INDEX "child_books_childId_bookId_key" ON "child_books"("childId", "bookId");
CREATE INDEX "child_books_childId_idx" ON "child_books"("childId");
CREATE INDEX "child_books_childId_status_idx" ON "child_books"("childId", "status");

-- 8. New foreign keys
ALTER TABLE "books" ADD CONSTRAINT "books_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "child_books" ADD CONSTRAINT "child_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "child_books" ADD CONSTRAINT "child_books_childId_fkey" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;
