-- CreateEnum
CREATE TYPE "IsOnsite" AS ENUM ('HYBRID', 'REMOTE', 'ONSITE');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "country" TEXT,
ADD COLUMN     "isOnsite" "IsOnsite" NOT NULL DEFAULT 'REMOTE';

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "country" TEXT;
