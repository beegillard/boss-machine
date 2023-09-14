const express = require('express');
const db = require('./db');

const ideasRouter = express.Router();

ideasRouter.param('/ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
})

//GET array of all ideas

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
})

// POST to create new idea and save to database
ideasRouter.post()
//GET /:ideaId
//PUT /:ideaId
//DELETE /:ideaId



module.exports = ideasRouter;



