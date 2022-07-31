/*
  Warnings:

  - You are about to drop the column `introductionId` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the `introductions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pickers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_introductionId_fkey";

-- DropForeignKey
ALTER TABLE "introductions" DROP CONSTRAINT "introductions_profileId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_pickerId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_postId_fkey";

-- DropForeignKey
ALTER TABLE "pickers" DROP CONSTRAINT "pickers_profileId_fkey";

-- DropForeignKey
ALTER TABLE "pickers" DROP CONSTRAINT "pickers_userId_fkey";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "introductionId";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "bonus" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "salary" INTEGER;

-- DropTable
DROP TABLE "introductions";

-- DropTable
DROP TABLE "jobs";

-- DropTable
DROP TABLE "pickers";

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pStatus" "Pstatus" NOT NULL DEFAULT E'NA',
    "postId" INTEGER NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
