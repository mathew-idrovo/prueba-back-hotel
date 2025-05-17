const express = require('express');
const RoomService = require('../services/room.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createRoomSchema,
  updateRoomSchema,
  getRoomSchema,
  queryRoomSchema,
} = require('../schemas/room.schema');
const router = express.Router();
const service = new RoomService();

router.get(
  '/',
  validatorHandler(queryRoomSchema, 'query'),
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
  validatorHandler(getRoomSchema, 'params'),
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
  validatorHandler(createRoomSchema, 'body'),
  async (req, res, next) => {
    try {
      const newRoom = await service.create(req.body);
      res.status(201).json(newRoom);
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getRoomSchema, 'params'),
  validatorHandler(updateRoomSchema, 'body'),
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
  validatorHandler(getRoomSchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.delete(req.params.id));
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
