-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantsOnMeeting" (
    "isHost" BOOLEAN NOT NULL,
    "participant_platform_id" TEXT NOT NULL,
    "meeting_id" TEXT NOT NULL,
    "participant_id" TEXT NOT NULL,
    "platform_id" TEXT NOT NULL,

    CONSTRAINT "ParticipantsOnMeeting_pkey" PRIMARY KEY ("participant_id","platform_id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- AddForeignKey
ALTER TABLE "ParticipantsOnMeeting" ADD CONSTRAINT "ParticipantsOnMeeting_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnMeeting" ADD CONSTRAINT "ParticipantsOnMeeting_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsOnMeeting" ADD CONSTRAINT "ParticipantsOnMeeting_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
