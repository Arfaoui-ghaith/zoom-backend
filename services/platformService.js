const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

const addPlatform = async (data) => {
    try {
        const platform = await prisma.platform.upsert({
            where: {
                id: data.id,
            },
            update: {},
            create: data,
        });

        return platform;
    }catch (err){
        return new AppError(err.message, 500)
    }
};

module.exports = {
    addPlatform
}