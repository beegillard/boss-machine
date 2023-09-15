const express = require('express');
const apiRouter = express.Router();


const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

const meetingsRouter = require('./meetings');
apiRouter.use('/meetings', meetingsRouter);

const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

const workRouter = require('./work');
apiRouter.use('/work', workRouter);



module.exports = apiRouter;
