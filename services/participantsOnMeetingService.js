const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

const addParticipantsOnMeeting = async (data) => {
    try {
        const participantOnMeeting = await prisma.participantsOnMeeting.create({
            data: {
                isHost: data.isHost,
                join_url: data.join_url,
                //registrant_id: data.registrant_id,
                //participant_pin_code: data.participant_pin_code,
                participant_platform_id: data.participant_platform_id,
                meeting: {connect: {id: data.meeting_id}},
                participant: {connect: {id: data.participant_id}},
                platform: {connect: {id: data.platform_id}}
            }
        });

        return participantOnMeeting;
    }catch (err){
        return new AppError(err.message, 500)
    }
};

module.exports = {
    addParticipantsOnMeeting
}