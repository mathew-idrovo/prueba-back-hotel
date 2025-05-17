const express = require('express');
const ReservationService = require('../services/reservation.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createReservationSchema,
  updateReservationSchema,
  getReservationSchema,
  queryReservationSchema,
} = require('../schemas/reservation.schema');

const router = express.Router();
const service = new ReservationService();

router.get(
  '/',
  validatorHandler(queryReservationSchema, 'query'),
  async (req, res, next) => {
    try {
      res.json(await service.find(req.query));
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/:id',
  validatorHandler(getReservationSchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.findOne(req.params.id));
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  validatorHandler(createReservationSchema, 'body'),
  async (req, res, next) => {
    try {
      const newRes = await service.create(req.body);
      res.status(201).json(newRes);
    } catch (err) {
      next(err);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getReservationSchema, 'params'),
  validatorHandler(updateReservationSchema, 'body'),
  async (req, res, next) => {
    try {
      res.json(await service.update(req.params.id, req.body));
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getReservationSchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.delete(req.params.id));
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
