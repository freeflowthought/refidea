/*
  Warnings:

  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postEmail` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `postID` on the `posts` table. All the data in the column will be lost.
  - The `category` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FRONTEND', 'BACKEND', 'FULLSTACK', 'DATA', 'BUSINESS');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NA', 'REJECTED', 'PENDING', 'APPROVAL');

-- CreateEnum
CREATE TYPE "Pstatus" AS ENUM ('NA', 'REJECTED', 'APPROVAL');

-- DropIndex
DROP INDEX "posts_postEmail_key";

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "postEmail",
DROP COLUMN "postID",
ADD COLUMN     "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT E'BACKEND',
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "interest" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'NA',

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "introduction" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picker" (
    "id" SERIAL NOT NULL,
    "pIntroduction" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "bonus" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,
    "pStatus" "Pstatus" NOT NULL DEFAULT E'NA',

    CONSTRAINT "Picker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picker" ADD CONSTRAINT "Picker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picker" ADD CONSTRAINT "Picker_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
