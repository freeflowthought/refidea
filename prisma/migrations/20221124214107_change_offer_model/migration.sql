/*
  Warnings:

  - The primary key for the `offers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "offers" DROP CONSTRAINT "offers_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "offers_pkey" PRIMARY KEY ("id");
