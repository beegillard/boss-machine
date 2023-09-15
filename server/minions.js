const express = require('express');
const db = require('./db');

const minionsRouter = express.Router();

//create minion param
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
})

// Return an array of all minions
minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
   res.send(minions);
})


//Create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

//GET  /:minionId to get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

// PUT /:minionId to update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
})
// DELETE /:minionId to delete single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

module.exports = minionsRouter;