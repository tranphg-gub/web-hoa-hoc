/*
  Warnings:

  - You are about to drop the column `chapter` on the `Document` table. All the data in the column will be lost.
  - Added the required column `chapterId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterId` to the `FlashcardSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chapterId` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grade" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grade" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("content", "createdAt", "grade", "id", "order", "title") SELECT "content", "createdAt", "grade", "id", "order", "title" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE TABLE "new_FlashcardSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grade" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    CONSTRAINT "FlashcardSet_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FlashcardSet" ("grade", "id", "topic") SELECT "grade", "id", "topic" FROM "FlashcardSet";
DROP TABLE "FlashcardSet";
ALTER TABLE "new_FlashcardSet" RENAME TO "FlashcardSet";
CREATE TABLE "new_Quiz" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "grade" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,
    "durationSec" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Quiz_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Quiz" ("createdAt", "durationSec", "grade", "id", "title") SELECT "createdAt", "durationSec", "grade", "id", "title" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_grade_order_key" ON "Chapter"("grade", "order");
