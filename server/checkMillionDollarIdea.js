const express = require('express');
const app = require('../server');


const checkMillionDollarIdea = (req, res, next) => {
    const weeks = Number(req.body.numWeeks);
    const revenue = Number(req.body.weeklyRevenue);
    const value = weeks * revenue;
    if (!weeks || !revenue || isNaN(value)) {
        res.status(400).send();
    } else {
        
        if (value < 1000000) {
            res.status(400).send();
        } else {
        next();
        }
    } 
};


// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
