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


//work routes
//get all work for a minion
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const works = db.getAllFromDatabase('work');
    const minionWork = works.filter((work) => {
        return work.minionId = req.params.minionId;
    })
    res.send(minionWork);
})

//api/minions/:minionId/work POST
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = db.addToDatabase('work', req.body);
    res.status(201).send(newWork);
})

//api/minions/:minionId/work/:workId
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send()
    } else {
        const updatedWork = db.updateInstanceInDatabase('work', req.body);
    res.send(updatedWork);
    } 
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });




module.exports = minionsRouter;