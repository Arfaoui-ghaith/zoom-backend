const AppError = require("../utils/appError");
const Joi = require('joi');
const requestService = require('./../services/requestService');

const participantSchema = Joi.object({
    participant_id: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    platform_id: Joi.string().required(),
}).required();

const requestSchema = Joi.object({
    max_duration: Joi.number().positive().required(),
    link_is_multiUse: Joi.bool().required(),
    host: Joi.object({
        host_id: Joi.string().required(),
        email: Joi.string().email().required(),
        name: Joi.string().min(3).required(),
        platform_id: Joi.string().required(),
    }).required(),
    participants: Joi.array().items(
        participantSchema
    ).min(1).required()
});


exports.verifyAndSaveRequest = async (req, res, next) => {
    try {
        await requestSchema.validateAsync(req.body);
        const request = await requestService.addRequest({
            senderIP: req.get('host')
        });

        let participants = req.body.participants.map(p => {
            return {
                participant_platform_id: p.id,
                name: p.name,
                email: p.email,
                platform_id: p.platform_id,
                isHost: false
            }
        });

        participants.push({
            participant_platform_id: req.body.host.host_id,
            name: req.body.host.name,
            email: req.body.host.email,
            platform_id: req.body.host.platform_id,
            isHost: true
        });

        console.log(participants);

        req.participantsInfo = participants;
        req.requestInfo = request;
        next();
    }catch (err){
        console.error(err)
        return next(
            new AppError(err.message,400)
        );
    }
};




