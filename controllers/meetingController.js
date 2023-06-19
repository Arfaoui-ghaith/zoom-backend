const axios = require('axios');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const base64 = require('base-64');
require('dotenv').config({ path: require('find-config')('.env') })

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

exports.createMeeting = catchAsync(async (req, res, next) => {
    const accessToken = await getZoomAccessToken();
    const participantUUIDs = ['participantUUID1', 'participantUUID2', 'participantUUID3'];
    const createMeetingResponse = await axios.post(
        'https://api.zoom.us/v2/users/me/meetings',
        {
            topic: 'Private Meeting',
            type: 2, // Scheduled meeting
            settings: {
                approval_type: 2,
                type: true,
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: true,
                    mute_upon_entry: false,
                    approval_type: 1, // Automatically approve participants to join the meeting
                    registration_type: 2, // Attendees register once and can attend any occurrence
                    audio: 'both',
                    auto_recording: 'none',
                    allow_multiple_devices: false
                }
            }
        },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );


    console.log(createMeetingResponse);

    const meeting = createMeetingResponse.data;

    res.json(meeting);
});



