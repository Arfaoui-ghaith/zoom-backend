const MeetingRequest = require('./../models/meetingRequest');
const AppError = require("../utils/appError");

exports.verifyAndSaveRequest = async (req, res, next) => {
    try {
        req.body.requestFrom = req.get('host');
        req.requestMeeting = await MeetingRequest.create(req.body);
        next();
    }catch (err){
        console.error(err)
        return next(
            new Error(err)
        );
    }
};