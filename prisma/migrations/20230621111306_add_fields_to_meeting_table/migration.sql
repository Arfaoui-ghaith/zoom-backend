/*
  Warnings:

  - You are about to drop the column `number` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `join_url` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pstn_password` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_url` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoom_id` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zoom_uuid` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "number",
ADD COLUMN     "join_url" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "pstn_password" TEXT NOT NULL,
ADD COLUMN     "start_url" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL,
ADD COLUMN     "zoom_id" BIGINT NOT NULL,
ADD COLUMN     "zoom_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParticipantsOnMeeting" ADD COLUMN     "join_url" TEXT;
