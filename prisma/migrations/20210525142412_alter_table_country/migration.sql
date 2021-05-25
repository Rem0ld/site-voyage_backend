/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[numericCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_countryId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "numericCode" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country.numericCode_unique" ON "Country"("numericCode");

-- AddForeignKey
ALTER TABLE "Picture" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;
