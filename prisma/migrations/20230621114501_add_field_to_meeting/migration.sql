/*
  Warnings:

  - A unique constraint covering the columns `[zoom_uuid]` on the table `Meeting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zoom_id]` on the table `Meeting` will be added. If there are existing duplicate values, this will fail.
  - Made the column `join_url` on table `ParticipantsOnMeeting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ParticipantsOnMeeting" ALTER COLUMN "join_url" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_zoom_uuid_key" ON "Meeting"("zoom_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_zoom_id_key" ON "Meeting"("zoom_id");
