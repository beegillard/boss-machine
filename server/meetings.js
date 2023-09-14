const express = require('express');
const { ModuleFilenameHelpers } = require('webpack');
const db = require('./db');

const meetingsRouter = express.Router();

//GET array of all meetings
//POST create new meeting and save to database
//DELETE all of the meetings

module.exports = meetingsRouter;