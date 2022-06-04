-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "useremail" VARCHAR(512) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_useremail_key" ON "User"("useremail");
