/*
  Warnings:

  - The primary key for the `offers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `offers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "offers" DROP CONSTRAINT "offers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "offers_pkey" PRIMARY KEY ("userId", "postId");
