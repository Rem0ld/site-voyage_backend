/*
  Warnings:

  - You are about to drop the column `countryId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `countryName` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_countryId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "countryId",
ADD COLUMN     "countryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("countryName") REFERENCES "Country"("name") ON DELETE CASCADE ON UPDATE CASCADE;
