const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

const addRequest = async (data) => {
    try {
        const request = await prisma.request.create({
            data: {
                senderIP: data.senderIP
            }
        });

        return request;
    }catch (err){
        console.log(err);
        return new AppError(err.message, 500)
    }
};

module.exports = {
    addRequest
}