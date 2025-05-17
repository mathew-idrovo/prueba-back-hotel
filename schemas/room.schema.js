const Joi = require('joi');

const id = Joi.number().integer();
const roomNumber = Joi.string().min(1).max(10);
const type = Joi.string().valid('single', 'double', 'suite');
const status = Joi.string().valid('available', 'occupied');

const createRoomSchema = Joi.object({
  roomNumber: roomNumber.required(),
  type: type.required(),
  status,
});

const updateRoomSchema = Joi.object({
  roomNumber,
  type,
  status,
});

const getRoomSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createRoomSchema,
  updateRoomSchema,
  getRoomSchema,
};
