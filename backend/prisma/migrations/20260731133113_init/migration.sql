-- CreateEnum
CREATE TYPE "LevelCategory" AS ENUM ('MAGIC', 'EXPLORERS', 'KNIGHTS', 'SPACE');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('adventure', 'fantasy', 'mystery', 'science', 'comics', 'romance', 'horror', 'biography', 'poetry', 'history', 'animals', 'humor');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('to-read', 'reading', 'finished');

-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('READING', 'GENRE', 'STREAK', 'SPECIAL');

-- CreateTable
CREATE TABLE "families" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_settings" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'pt-PT',
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "weeklyReport" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "children" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '👦',
    "birthYear" INTEGER,
    "levelCategory" "LevelCategory" NOT NULL DEFAULT 'EXPLORERS',
    "dailyGoal" INTEGER NOT NULL DEFAULT 15,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "children_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "isbn" TEXT,
    "genre" "Genre" NOT NULL,
    "totalPages" INTEGER,
    "status" "BookStatus" NOT NULL DEFAULT 'to-read',
    "currentPage" INTEGER,
    "startDate" TIMESTAMP(3),
    "finishDate" TIMESTAMP(3),
    "rating" INTEGER,
    "notes" TEXT,
    "favoriteCharacter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "category" "AchievementCategory" NOT NULL DEFAULT 'READING',
    "requirements" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "child_achievements" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "child_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reading_sessions" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutes" INTEGER NOT NULL,
    "bookId" TEXT NOT NULL,
    "pageEnd" INTEGER,
    "mood" INTEGER DEFAULT 3,
    "finishedBook" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "families_email_key" ON "families"("email");

-- CreateIndex
CREATE UNIQUE INDEX "family_settings_familyId_key" ON "family_settings"("familyId");

-- CreateIndex
CREATE INDEX "children_familyId_idx" ON "children"("familyId");

-- CreateIndex
CREATE INDEX "books_childId_idx" ON "books"("childId");

-- CreateIndex
CREATE INDEX "books_genre_idx" ON "books"("genre");

-- CreateIndex
CREATE INDEX "books_childId_status_idx" ON "books"("childId", "status");

-- CreateIndex
CREATE INDEX "books_childId_genre_idx" ON "books"("childId", "genre");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_code_key" ON "achievements"("code");

-- CreateIndex
CREATE UNIQUE INDEX "child_achievements_childId_achievementId_key" ON "child_achievements"("childId", "achievementId");

-- CreateIndex
CREATE INDEX "reading_sessions_childId_idx" ON "reading_sessions"("childId");

-- CreateIndex
CREATE INDEX "reading_sessions_childId_date_idx" ON "reading_sessions"("childId", "date");

-- CreateIndex
CREATE INDEX "reading_sessions_bookId_idx" ON "reading_sessions"("bookId");

-- AddForeignKey
ALTER TABLE "family_settings" ADD CONSTRAINT "family_settings_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "children" ADD CONSTRAINT "children_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_childId_fkey" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_achievements" ADD CONSTRAINT "child_achievements_childId_fkey" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "child_achievements" ADD CONSTRAINT "child_achievements_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_sessions" ADD CONSTRAINT "reading_sessions_childId_fkey" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_sessions" ADD CONSTRAINT "reading_sessions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
