const mongoose = require('mongoose');
require('dotenv').config({ path: require('find-config')('.env') })
const app = require('./app');

process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('UNCAUGHT EXCEPTION! Shutting down....');
    process.exit(1);
});

const uri =
    "mongodb+srv://user77:aX5v5O7pAzySfHGa@cluster0.titvxzm.mongodb.net/zooms?retryWrites=true&w=majority";

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successful');
    });

const port = process.env.PORT || 9000;
const server = app.listen(port, async() => {
    console.log(`App running on Port ${port}`);
});

process.on('unHandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLER REJECTION! Shutting down....');
    server.close(() => {
        process.exit(1);
    });
});