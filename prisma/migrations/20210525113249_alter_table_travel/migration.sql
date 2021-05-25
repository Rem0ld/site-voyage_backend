/*
  Warnings:

  - You are about to drop the column `toCountry` on the `Travel` table. All the data in the column will be lost.
  - Added the required column `destination` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "toCountry",
ADD COLUMN     "destination" TEXT NOT NULL;
