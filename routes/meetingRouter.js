const express = require('express');
const router = express.Router();
const meetingController = require('./../controllers/meetingController');
const middleware = require('./../middlewares/createMeetingVerificationInput');

router.use(middleware.verifyAndSaveRequest);
router.route('/create').post(meetingController.createMeeting);


module.exports = router;