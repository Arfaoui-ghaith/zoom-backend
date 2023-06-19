const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const participantSchema = new Schema({
    platform_id: {
        type: String,
        required: [true, 'Participant platform id required'],
    },
    participant_id: {
        type: String,
        required: [true, 'Participant id required'],
    }
});

const meetingRequestSchema = new mongoose.Schema({
    requestFrom: {
        type: String,
        required: [true, 'Request sender required'],
    },
    max_minutes: {
        type: Number,
        required: [true, 'Max minutes duration required'],
        validate: {
            validator: function (number) {
                return number > 0;
            },
            message: 'Invalid max minutes duration',
        }
    },
    receivedAt: {
        type: Date,
        default: Date.now(),
    },
    participant_link_multi_use: {
        type: Boolean,
        required: [true, 'Mention if the participant can use the join link on multiple devices or not'],
    },
    host:{
        platform_id: {
            type: String,
            required: [true, 'Host platform id required'],
        },
        host_id: {
            type: String,
            required: [true, 'Host id required'],
        }
    },
    participants: {
        type: [participantSchema],
        validate: {
            validator: function (p) {
                return p.length > 0;
            },
            message: 'The list must contain at least one participant'
        }
    }
});

const MeetingRequest = mongoose.model('MeetingRequest', meetingRequestSchema);

module.exports = MeetingRequest;