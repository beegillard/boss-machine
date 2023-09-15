const express = require('express');
const db = require('./db');

const workRouter = express.Router();

workRouter.get('/', (req, res, next) => {
    const work = db.getAllFromDatabase('work');
    res.send(work);
})





module.exports = workRouter;