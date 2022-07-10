/*
  Warnings:

  - You are about to drop the `Picker` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Picker" DROP CONSTRAINT "Picker_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Picker" DROP CONSTRAINT "Picker_userId_fkey";

-- DropTable
DROP TABLE "Picker";

-- CreateTable
CREATE TABLE "pickers" (
    "id" SERIAL NOT NULL,
    "pIntroduction" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "bonus" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,
    "pStatus" "Pstatus" NOT NULL DEFAULT E'NA',

    CONSTRAINT "pickers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pickers_userId_key" ON "pickers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "pickers" ADD CONSTRAINT "pickers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickers" ADD CONSTRAINT "pickers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
