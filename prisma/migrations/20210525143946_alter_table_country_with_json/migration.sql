/*
  Warnings:

  - The `currencies` column on the `Country` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `languages` column on the `Country` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `translations` column on the `Country` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regionalBlocks` column on the `Country` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "capital" TEXT,
DROP COLUMN "currencies",
ADD COLUMN     "currencies" JSONB[],
DROP COLUMN "languages",
ADD COLUMN     "languages" JSONB[],
DROP COLUMN "translations",
ADD COLUMN     "translations" JSONB[],
DROP COLUMN "regionalBlocks",
ADD COLUMN     "regionalBlocks" JSONB[];
