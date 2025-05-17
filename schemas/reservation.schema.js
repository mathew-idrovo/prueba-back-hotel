const Joi = require('joi');

const id = Joi.number().integer();
const roomId = Joi.number().integer();
const guestName = Joi.string().min(1);
const startTime = Joi.date().iso();
const endTime = Joi.date().iso();

const createReservationSchema = Joi.object({
  roomId: roomId.required(),
  guestName: guestName.required(),
  startTime: startTime.required(),
  endTime: endTime.required(),
});

const updateReservationSchema = Joi.object({
  roomId,
  guestName,
  startTime,
  endTime,
});

const getReservationSchema = Joi.object({ id: id.required() });

const queryReservationSchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  roomId,
});

module.exports = {
  createReservationSchema,
  updateReservationSchema,
  getReservationSchema,
  queryReservationSchema,
};
