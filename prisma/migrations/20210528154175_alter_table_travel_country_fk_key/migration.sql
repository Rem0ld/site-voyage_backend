-- AddForeignKey
ALTER TABLE "Travel" DROP CONSTRAINT "Travel_userId_fkey";
ALTER TABLE "Travel" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Review" DROP CONSTRAINT "Review_countryId_fkey";
ALTER TABLE "Review" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Travel" DROP CONSTRAINT "Travel_destination_fkey";
ALTER TABLE "Travel" ADD FOREIGN KEY ("destination") REFERENCES "Country"("name") ON DELETE SET NULL ON UPDATE CASCADE;