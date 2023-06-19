const express = require('express');
const app = express();
const cors = require('cors');
const meetingRoutes = require('./routes/meetingRouter');

app.use(cors({
    origin: '*',
    preflightContinue:false,
    credentials: true
}));

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController.js');
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/meetings', meetingRoutes);


app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;