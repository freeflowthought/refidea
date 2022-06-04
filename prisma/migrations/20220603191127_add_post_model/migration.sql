/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "useremail" VARCHAR(512) NOT NULL,
    "password" VARCHAR(256) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "postID" SERIAL NOT NULL,
    "postEmail" VARCHAR(512) NOT NULL,
    "postTitle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "minSalary" INTEGER,
    "maxSalary" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("postID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_useremail_key" ON "users"("useremail");

-- CreateIndex
CREATE UNIQUE INDEX "posts_postEmail_key" ON "posts"("postEmail");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
