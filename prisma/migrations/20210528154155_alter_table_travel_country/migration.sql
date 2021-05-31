/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Country.name_unique" ON "Country"("name");

-- AddForeignKey
ALTER TABLE "Travel" ADD FOREIGN KEY ("destination") REFERENCES "Country"("name") ON DELETE CASCADE ON UPDATE CASCADE;
