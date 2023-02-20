/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `offers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "offers_userId_postId_key" ON "offers"("userId", "postId");
