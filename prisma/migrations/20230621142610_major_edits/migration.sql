/*
  Warnings:

  - You are about to drop the column `participant_pin_code` on the `ParticipantsOnMeeting` table. All the data in the column will be lost.
  - You are about to drop the column `registrant_id` on the `ParticipantsOnMeeting` table. All the data in the column will be lost.
  - Added the required column `token` to the `ParticipantsOnMeeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "zoom_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ParticipantsOnMeeting" DROP COLUMN "participant_pin_code",
DROP COLUMN "registrant_id",
ADD COLUMN     "token" TEXT NOT NULL;
