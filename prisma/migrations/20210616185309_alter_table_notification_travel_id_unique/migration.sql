/*
  Warnings:

  - A unique constraint covering the columns `[travelId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification.travelId_unique" ON "Notification"("travelId");
