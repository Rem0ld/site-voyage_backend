/*
  Warnings:

  - The `area` column on the `Country` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "area",
ADD COLUMN     "area" DOUBLE PRECISION;
