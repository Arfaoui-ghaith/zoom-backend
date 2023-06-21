/*
  Warnings:

  - Added the required column `participant_pin_code` to the `ParticipantsOnMeeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrant_id` to the `ParticipantsOnMeeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParticipantsOnMeeting" ADD COLUMN     "participant_pin_code" INTEGER NOT NULL,
ADD COLUMN     "registrant_id" TEXT NOT NULL;
