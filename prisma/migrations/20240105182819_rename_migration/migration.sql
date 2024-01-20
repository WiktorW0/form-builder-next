/*
  Warnings:

  - You are about to drop the column `submitions` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form"
RENAME COLUMN "submitions" TO "submission";
