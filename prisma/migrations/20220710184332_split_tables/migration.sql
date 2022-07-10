/*
  Warnings:

  - You are about to drop the column `introduction` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `bonus` on the `pickers` table. All the data in the column will be lost.
  - You are about to drop the column `pIntroduction` on the `pickers` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `pickers` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `maxSalary` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `minSalary` on the `posts` table. All the data in the column will be lost.
  - Added the required column `introductionId` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applications" DROP COLUMN "introduction",
ADD COLUMN     "introductionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pickers" DROP COLUMN "bonus",
DROP COLUMN "pIntroduction",
DROP COLUMN "salary";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "description",
DROP COLUMN "maxSalary",
DROP COLUMN "minSalary";

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "salary" INTEGER,
    "bonus" INTEGER,
    "postId" INTEGER NOT NULL,
    "pickerId" INTEGER NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "introductions" (
    "id" SERIAL NOT NULL,
    "introduction" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "introductions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_postId_key" ON "jobs"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "introductions_profileId_key" ON "introductions"("profileId");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_introductionId_fkey" FOREIGN KEY ("introductionId") REFERENCES "introductions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_pickerId_fkey" FOREIGN KEY ("pickerId") REFERENCES "pickers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "introductions" ADD CONSTRAINT "introductions_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
