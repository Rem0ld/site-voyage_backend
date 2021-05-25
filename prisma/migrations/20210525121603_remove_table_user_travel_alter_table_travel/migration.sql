/*
  Warnings:

  - You are about to drop the `UserTravel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserTravel" DROP CONSTRAINT "UserTravel_travelId_fkey";

-- DropForeignKey
ALTER TABLE "UserTravel" DROP CONSTRAINT "UserTravel_userId_fkey";

-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserTravel";

-- AddForeignKey
ALTER TABLE "Travel" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
