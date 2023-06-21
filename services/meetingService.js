const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

const addMeeting = async (data) => {
    try {
        const meeting = await prisma.meeting.create({
            data: {
                zoom_uuid: data.zoom_uuid,
                zoom_id: `${data.zoom_id}`,
                duration: data.duration,
                pstn_password: data.pstn_password,
                start_url: data.start_url,
                join_url: data.join_url,
                password: data.password,
                type: data.type,
                request: {connect: {id: data.request_id}}
            }
        });

        return meeting;
    }catch (err){
        return new AppError('Something went wrong when create a meeting', 500)
    }
};

module.exports = {
    addMeeting
}