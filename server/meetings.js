const express = require('express');
const db = require('./db');

const meetingsRouter = express.Router();

//GET array of all meetings
meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
})

//POST create new meeting and save to database
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
})

//DELETE all of the meetings
meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
})

module.exports = meetingsRouter;