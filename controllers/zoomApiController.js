const axios = require('axios');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const base64 = require('base-64');
require('dotenv').config({ path: require('find-config')('.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const platformService = require('./../services/platformService');
const participantService = require('./../services/participantService');
const meetingService = require('./../services/meetingService');
const participantOnMeetingService = require('./../services/participantsOnMeetingService');

const signToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const getZoomAccessToken = async () => {
    const accountId = process.env.ZOOM_ACCOUNT_ID;
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;

    const credentials = `${clientId}:${clientSecret}`;
    const encodedCredentials = base64.encode(credentials);

    const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`;

    try {
        const response = await axios.post(tokenUrl, null, {
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
                'Content-Type': 'application/json'
            }
        });

        const { access_token } = response.data;
        return access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error.response.data);
    }
};

exports.createZoomMeeting = catchAsync(async (req, res, next) => {
    const accessToken = await getZoomAccessToken();
    const createMeetingResponse = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
            type: 2,
            duration: req.body.max_duration,
            //private_meeting: true,
            settings: {
                //allow_multiple_devices: req.body.link_is_multiUse,
                //auto_recording: 'cloud',
                host_video: true,
                participant_video: true,
                join_before_host: true,
                //registrants_confirmation_email: false
            },
        },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    const meeting = await meetingService.addMeeting({
        zoom_uuid: createMeetingResponse.data.uuid,
        zoom_id: createMeetingResponse.data.id,
        duration: createMeetingResponse.data.duration,
        pstn_password: createMeetingResponse.data.pstn_password,
        start_url: createMeetingResponse.data.start_url,
        join_url: createMeetingResponse.data.join_url,
        password: createMeetingResponse.data.password,
        type: createMeetingResponse.data.type,
        request_id: req.requestInfo.id
    });

    req.meetingResponse = createMeetingResponse.data;
    req.meeting = meeting
    next();
});

exports.addRegistrantsToMeeting = catchAsync(async (req, res, next) => {
    const accessToken = await getZoomAccessToken();
    let participants = [];
    let host;


    for(let p of req.participantsInfo) {

        const platform = await platformService.addPlatform({id: p.platform_id});
        const participant = await participantService.addParticipant({
            email: p.email,
            name: p.name
        });

        /*const createMeetingResponse = await axios.post(
            `https://api.zoom.us/v2/meetings/${req.meetingResponse.id}/registrants`,
            {
                first_name: p.name,
                email: p.email,
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );*/

        let participantToken = signToken({
            isHost: p.isHost,
            participant_platform_id: p.participant_platform_id,
            meeting_id: req.meeting.id,
            platform_id: platform.id,
            participant_id: participant.id
        });

        const participantOnMeeting = await participantOnMeetingService.addParticipantsOnMeeting({
            isHost: p.isHost,
            participant_platform_id: p.participant_platform_id,
            join_url: /*createMeetingResponse.data.join_url,*/ `${process.env.FRONT_END_SERVER}/join/${participantToken}`,
            //registrant_id: /*createMeetingResponse.data.registrant_id,*/
            //participant_pin_code: createMeetingResponse.data.participant_pin_code,
            meeting_id: req.meeting.id,
            participant_id: participant.id,
            platform_id: platform.id
        });

        console.log(participantOnMeeting);

        if(p.isHost){
            host = {
                join_url: participantOnMeeting.join_url,
                email: p.email,
                name: p.name,
                host_id: p.participant_platform_id,
                platform_id: p.platform_id
            };
        }

        participants.push({
            join_url: participantOnMeeting.join_url,
            email: p.email,
            name: p.name,
            participant_id: p.participant_platform_id,
            platform_id: p.platform_id
        });

    }

    res.json({
        request: req.requestInfo,
        meeting: req.meeting,
        host,
        participants
    });
});



