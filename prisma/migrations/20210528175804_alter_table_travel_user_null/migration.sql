/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Picture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Travel" ALTER COLUMN "userId" DROP NOT NULL;
