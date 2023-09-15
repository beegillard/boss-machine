const express = require('express');
const db = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

const ideasRouter = express.Router();

//create ideas param
ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
})

//return array of all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.send(ideas);
})

//create new idea and save to database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

//return idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

//PUT /:ideaId
ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
})

//DELETE /:ideaId
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deletedIdea = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }

})



module.exports = ideasRouter;



