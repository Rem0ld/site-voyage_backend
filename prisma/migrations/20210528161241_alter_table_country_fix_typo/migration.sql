/*
  Warnings:

  - You are about to drop the column `regionalBlocks` on the `Country` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Country" DROP COLUMN "regionalBlocks",
ADD COLUMN     "regionalBlocs" JSONB[],
ALTER COLUMN "gini" SET DATA TYPE DOUBLE PRECISION;
