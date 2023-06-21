const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

const addParticipant = async (data) => {
    try {
        const participant = await prisma.participant.upsert({
            where: {
                email: data.email,
            },
            update: {},
            create: data,
        });

        return participant;
    }catch (err){
        return new AppError(err.message, 500)
    }
};

module.exports = {
    addParticipant
}