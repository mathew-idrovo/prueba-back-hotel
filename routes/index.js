const express = require('express');

const roomRouter = require('./room.router');
// const reservationRouter = require('./reservation.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/rooms', roomRouter);
  // router.use('/reservation', reservationRouter);
}

module.exports = routerApi;
