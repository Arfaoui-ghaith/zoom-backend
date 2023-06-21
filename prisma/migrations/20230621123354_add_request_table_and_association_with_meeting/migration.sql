/*
  Warnings:

  - A unique constraint covering the columns `[request_id]` on the table `Meeting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `request_id` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "request_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "recievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderIP" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_request_id_key" ON "Meeting"("request_id");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
