const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class RoomService {
  async create(data) {
    try {
      return await models.Room.create(data);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw boom.conflict('roomNumber already exists');
      }

      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map((e) => e.message).join(', ');
        throw boom.badRequest(messages);
      }
      throw error;
    }
  }

  async find(query) {
    const { page = 1, limit = 10, type, status } = query;
    const offset = (page - 1) * limit;
    const where = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const { count, rows } = await models.Room.findAndCountAll({
      where,
      offset,
      limit,
    });
    return { total: count, rooms: rows };
  }

  async findOne(id) {
    const room = await models.Room.findByPk(id);
    if (!room) throw boom.notFound('Room not found');
    return room;
  }

  async update(id, changes) {
    const room = await this.findOne(id);
    return await room.update(changes);
  }

  async delete(id) {
    const room = await this.findOne(id);
    await room.destroy();
    return { id };
  }
}
module.exports = RoomService;
