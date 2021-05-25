-- AlterTable
ALTER TABLE "Travel" ALTER COLUMN "fromCountry" DROP NOT NULL,
ALTER COLUMN "departureDate" DROP NOT NULL,
ALTER COLUMN "returnDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserTravel" ALTER COLUMN "departureDate" DROP NOT NULL;
