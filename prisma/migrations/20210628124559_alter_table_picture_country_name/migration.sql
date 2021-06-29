/*
  Warnings:

  - You are about to drop the column `countryId` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `countryName` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_countryId_fkey";

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "countryId",
ADD COLUMN     "countryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Picture" ADD FOREIGN KEY ("countryName") REFERENCES "Country"("name") ON DELETE CASCADE ON UPDATE CASCADE;
