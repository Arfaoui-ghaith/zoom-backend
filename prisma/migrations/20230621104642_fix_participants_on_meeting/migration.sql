/*
  Warnings:

  - The primary key for the `ParticipantsOnMeeting` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ParticipantsOnMeeting" DROP CONSTRAINT "ParticipantsOnMeeting_pkey",
ADD CONSTRAINT "ParticipantsOnMeeting_pkey" PRIMARY KEY ("participant_id", "platform_id", "meeting_id");
