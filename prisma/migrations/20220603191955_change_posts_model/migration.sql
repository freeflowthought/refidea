/*
  Warnings:

  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT NOT NULL,
ALTER COLUMN "category" DROP NOT NULL;
