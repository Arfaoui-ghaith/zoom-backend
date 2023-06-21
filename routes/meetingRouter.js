const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/zoomApiController');
const middleware = require('../middlewares/meetingVerificationInput');

router.use(middleware.verifyAndSaveRequest);
router.route('/create').post(meetingController.createZoomMeeting,meetingController.addRegistrantsToMeeting);


module.exports = router;